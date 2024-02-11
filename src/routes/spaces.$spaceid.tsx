import { ActionIcon, Group, TextInput } from "@mantine/core";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { ChatBox } from "@/features/space";
import classes from "./space.module.css";

export const Route = createFileRoute("/spaces/$spaceid")({
  component: Space,
});

function Space() {
  const { spaceid } = Route.useParams();
  return (
    <div className={classes.container}>
      <h2>Space : {spaceid}</h2>
      <div className={classes.content}>
        <ChatBox />
      </div>
      <Group>
        <TextInput />
        <ActionIcon>
          {" "}
          <PaperPlaneRight />{" "}
        </ActionIcon>
      </Group>
    </div>
  );
}
