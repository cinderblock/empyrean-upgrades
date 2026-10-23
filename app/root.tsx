import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@fontsource-variable/cormorant/index.css";
import "@fontsource-variable/inter/index.css";
import "./styles/global.css";
import FeedbackLayer from "./components/FeedbackLayer";
import { REVIEW_SCRIPT, ReviewProvider } from "./components/ReviewContext";
import { ReportViews } from "./components/ReportViews";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // data-review is set by REVIEW_SCRIPT before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Review marks on or off before first paint: ?review=off|on. */}
        <script dangerouslySetInnerHTML={{ __html: REVIEW_SCRIPT }} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Before the stylesheet loads, so the browser's own canvas already
            matches the system scheme on the first frame. */}
        <meta name="color-scheme" content="light dark" />
        <meta
          name="theme-color"
          content="#f7f6fb"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#06060f"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ReviewProvider>
      <Outlet />
      <ReportViews />
      <FeedbackLayer />
    </ReviewProvider>
  );
}
