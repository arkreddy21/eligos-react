import {
  Outlet,
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Landing } from "@/features/misc";
import { AuthRoute } from "@/features/auth";

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
  component: () => <AuthRoute/>,
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => <h1>home</h1>
})

const routeTree = rootRoute.addChildren([indexRoute, authRoute, homeRoute]);

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
