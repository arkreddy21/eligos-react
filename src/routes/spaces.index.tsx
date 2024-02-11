import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@mantine/core";
import { Spaces } from "@/features/space";
import classes from "./space.module.css";
import { Ghost } from "@phosphor-icons/react";

export const Route = createFileRoute("/spaces/")({
  component: DynamicView,
});

function DynamicView() {
  return (
    <div className={classes.dynamic}>
      <div className={classes.ghost}>
        <Ghost size={56} />
        <Text>select a space to view</Text>
      </div>
      <Spaces />
    </div>
  );
}
