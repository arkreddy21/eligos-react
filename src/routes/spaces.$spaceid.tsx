import { useState } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import classes from "./space.module.css";
import { ChatBox, getMessages, getSpaces } from "@/features/space";
import { useGlobalContext } from "@/context";
import { useWsContext } from "@/websocketContext";

export const Route = createFileRoute("/spaces/$spaceid")({
  component: Space,
});

function Space() {
  const { user } = useGlobalContext();
  const querySpaces = useQuery({
    queryKey: ["spaces", user],
    queryFn: getSpaces,
  });

  const { spaceid } = Route.useParams();
  const query = useQuery({
    queryKey: ["messages", spaceid],
    queryFn: () => getMessages(spaceid),
  });

  const [text, setText] = useState("");
  const { websocket } = useWsContext();

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === "" || !user) return;
    const m: WsMessage = {
      proto: "message",
      spaceid,
      payload: {
        userid: user.id,
        spaceid,
        body: text,
        user: user,
      },
    };
    if (websocket?.readyState === 1) {
      websocket?.send(JSON.stringify(m));
    }
    setText("");
  };

  return (
    <div className={classes.container}>
      <h2>{querySpaces.data?.find((space) => space.id === spaceid)?.name}</h2>
      <div className={classes.chats}>
        {query.data?.map((message) => (
          <ChatBox key={message.id} message={message} />
        ))}
      </div>
      <form
        autoComplete="off"
        className={classes.footer}
        onSubmit={handleSendMessage}
      >
        <TextInput
          radius="md"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <ActionIcon type="submit" size="lg" radius="md">
          <PaperPlaneRight weight="fill" />
        </ActionIcon>
      </form>
    </div>
  );
}
