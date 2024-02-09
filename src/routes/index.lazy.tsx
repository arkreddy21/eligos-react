import { createLazyFileRoute } from "@tanstack/react-router";
import { Landing } from "@/features/misc";

export const Route = createLazyFileRoute("/")({
  component: Landing,
});
