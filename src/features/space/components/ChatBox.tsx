import { Text } from "@mantine/core";
import classes from "./chatbox.module.css";

export function ChatBox({message}: {message: Message}) {
  return (
    <div className={classes.container} >
      <Text c="blue" size="sm">username</Text>
      <div>{message.body}</div>
    </div>
  );
}
