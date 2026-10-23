import type { Config } from "@react-router/dev/config";
import { CATEGORY_IDS } from "./app/content/categories";

export default {
  ssr: false,
  // Listed explicitly rather than `true`: the catch-all route has no concrete
  // path. `/404` is what the host serves on a miss.
  prerender: [
    "/",
    "/budget",
    "/review",
    ...CATEGORY_IDS.map((id) => `/plans/${id}`),
    "/404",
  ],
} satisfies Config;
