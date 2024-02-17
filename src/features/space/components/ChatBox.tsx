import { Text } from "@mantine/core";
import classes from "./chatbox.module.css";

export function ChatBox({message}: {message: MessageWUser}) {
  return (
    <div className={classes.container} >
      <Text c="blue" size="sm">{message.user.name}</Text>
      <div>{message.body}</div>
    </div>
  );
}
