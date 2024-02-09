import {
  Outlet,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Landing } from "@/features/misc";
import { AuthRoute } from "@/features/auth";
import { isAuthenticated } from "@/utils";
import { Home } from "./Home";
import { Space } from "./Space";

// eslint-disable-next-line react-refresh/only-export-components
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Landing />,
});

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth",
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/home" });
    }
  },
  component: () => <AuthRoute />,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/home",
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});

const homeIndexRoute = new Route({
  getParentRoute: () => homeRoute,
  path: "/",
  component: () => <Home />,
});

const spaceRoute = new Route({
  getParentRoute: () => homeRoute,
  path: "/space",
  component: () => <Space />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  homeRoute.addChildren([homeIndexRoute, spaceRoute]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1>Page not found</h1>,
});

const router = new Router({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
