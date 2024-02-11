import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/utils";
import { Spaces } from "@/features/space";
import classes from "./space.module.css";

export const Route = createFileRoute("/spaces")({
  component: SpacesRoot,
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({ to: "/" });
    }
  },
});

function SpacesRoot() {
  return (
    <div className={classes.layout}>
      <Spaces />
      <Outlet />
    </div>
  );
}
