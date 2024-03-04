import { Group, Text } from "@mantine/core";
import classes from "./chatbox.module.css";

export function ChatBox({message}: {message: MessageWUser}) {
  return (
    <div className={classes.container} >
      <Group justify="space-between" >
        <Text c="blue" size="sm">{message.user.name}</Text>
        <Text c="dimmed" size="xs" >{new Date(message.createdAt).toLocaleString()}</Text>
      </Group>
      <div>{message.body}</div>
    </div>
  );
}
