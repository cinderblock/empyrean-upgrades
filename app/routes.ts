import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("budget", "routes/budget.tsx"),
  route("plans/:id", "routes/plan.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
