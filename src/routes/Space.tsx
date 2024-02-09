import { ActionIcon, Group, TextInput } from "@mantine/core";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useSearch } from "@tanstack/react-router";
import { ChatBox } from "@/features/space/components/ChatBox";
import classes from "./space.module.css";

export function Space() {
  const { id, name } = useSearch("/home/space");
  return (
    <div className={classes.container}>
      <h2>Space : {name}</h2>
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
