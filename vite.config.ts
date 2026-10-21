import { reactRouter } from "@react-router/dev/vite";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

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

export default defineConfig({
  plugins: [reactRouter(), trailingSlashLikeTheDeploy()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["noook", "noook.tsl"],
  },
});
