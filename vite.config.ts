import { reactRouter } from "@react-router/dev/vite";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";
import { fileStore } from "./scripts/feedback-file";
import {
  FEEDBACK_PATH,
  handleFeedback,
  memoryStore,
  type Store,
} from "./worker/feedback";

// `vite preview` serves the built site to the Playwright suite. Unlike Workers
// static assets (html_handling auto-trailing-slash), it answers a bare
// `/budget` with the SPA fallback, the home page, which React Router then
// hydrates against the wrong markup. Redirect to the directory form, as the
// deploy does, so tests see the page a visitor sees.
function trailingSlashLikeTheDeploy(): Plugin {
  return {
    name: "trailing-slash-like-the-deploy",
    configurePreviewServer(server) {
      const outDir = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? "/", "http://x");
        const path = url.pathname;
        if (
          path !== "/" &&
          !path.endsWith("/") &&
          !/\.[a-z0-9]+$/i.test(path) &&
          existsSync(join(outDir, path, "index.html"))
        ) {
          res.statusCode = 307;
          res.setHeader("location", `${path}/${url.search}`);
          res.end();
          return;
        }
        next();
      });
    },
  };
}

// The feedback API without the Worker: `bun run dev` keeps it in
// .feedback/dev.jsonl (read it with `bun run feedback --local`), the preview
// server the tests use keeps it in memory. Locally everyone is "dev" and sees
// everything, as `main` does on the site.
function feedbackApi(): Plugin {
  const serve =
    (store: Store) =>
    async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const path = (req.url ?? "/").split("?")[0];
      if (path !== FEEDBACK_PATH && !path.startsWith(`${FEEDBACK_PATH}/`)) {
        return next();
      }
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === "string") headers.set(k, v);
      }
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers,
        body: chunks.length ? Buffer.concat(chunks) : undefined,
      });
      const response = await handleFeedback(
        request,
        { who: "dev", admin: true },
        store,
      );
      res.statusCode = response.status;
      response.headers.forEach((v, k) => res.setHeader(k, v));
      res.end(await response.text());
    };
  return {
    name: "feedback-api",
    configureServer(server) {
      server.middlewares.use(serve(fileStore()));
    },
    configurePreviewServer(server) {
      server.middlewares.use(serve(memoryStore()));
    },
  };
}

export default defineConfig({
  plugins: [reactRouter(), trailingSlashLikeTheDeploy(), feedbackApi()],
  // Feedback records which build it was left on.
  define: {
    __BUILD__: JSON.stringify(
      (process.env.WORKERS_CI_COMMIT_SHA ?? "").slice(0, 7),
    ),
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["noook", "noook.tsl"],
  },
});
