import { AuthRoute } from "@/features/auth";
import { isAuthenticated } from "@/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthRoute,
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/spaces" });
    }
  },
})