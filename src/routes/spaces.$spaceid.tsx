import { useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import {
  DotsThreeOutlineVertical,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import classes from "./space.module.css";
import { ChatBox, getMessages, getSpaces, inviteUser } from "@/features/space";
import { useGlobalContext } from "@/context";
import { useWsContext } from "@/websocketContext";
import { useDisclosure } from "@mantine/hooks";

export const Route = createFileRoute("/spaces/$spaceid")({
  component: Space,
});

function Space() {
  const { spaceid } = Route.useParams();

  const { user } = useGlobalContext();
  const querySpaces = useQuery({
    queryKey: ["spaces", user],
    queryFn: getSpaces,
  });
  const spaceName =
    querySpaces.data?.find((space) => space.id === spaceid)?.name || "";

  const query = useQuery({
    queryKey: ["messages", spaceid],
    queryFn: () => getMessages(spaceid),
  });

  const [text, setText] = useState("");
  const { websocket } = useWsContext();

  const [inviteModalState, inviteModalControls] = useDisclosure();
  const [invitee, setInvitee] = useState("");
  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled = true;
    try {
      inviteUser(spaceid, spaceName, invitee);
      console.log("invite sent");  //TODO: use notifications/toast to notify user
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
    inviteModalControls.close();
    setInvitee("");
  };

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
      <Group justify="space-between">
        <h2>{spaceName}</h2>

        <Menu
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right", duration: 150 }}
        >
          <Menu.Target>
            <ActionIcon variant="transparent">
              <DotsThreeOutlineVertical weight="fill" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={inviteModalControls.open}>
              Invite member
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Modal
        opened={inviteModalState}
        onClose={inviteModalControls.close}
        title={`Invite to ${spaceName}`}
      >
        <Stack>
          <TextInput
            label="Email"
            value={invitee}
            onChange={(e) => setInvitee(e.target.value)}
          />
          <Button onClick={handleInvite}>Invite</Button>
        </Stack>
      </Modal>

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
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <ActionIcon type="submit" size="input-sm" radius="md">
          <PaperPlaneRight weight="fill" />
        </ActionIcon>
      </form>
    </div>
  );
}
