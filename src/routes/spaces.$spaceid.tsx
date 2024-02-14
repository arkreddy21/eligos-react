import { ActionIcon, TextInput } from "@mantine/core";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { ChatBox, getMessages, getSpaces } from "@/features/space";
import { useQuery } from "@tanstack/react-query";
import classes from "./space.module.css";
import { useGlobalContext } from "@/context";

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

  return (
    <div className={classes.container}>
      <h2>{querySpaces.data?.find((space) => (space.id === spaceid))?.name}</h2>
      <div className={classes.chats}>
        {query.data?.map((message) => (
          <ChatBox key={message.id} message={message} />
        ))}
      </div>
      <div className={classes.footer}>
        <TextInput radius="md" />
        <ActionIcon size="lg" radius="md">
          <PaperPlaneRight />
        </ActionIcon>
      </div>
    </div>
  );
}
