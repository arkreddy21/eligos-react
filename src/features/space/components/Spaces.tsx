import { useGlobalContext } from "@/context";
import { createSpace, getSpaces } from "@/features/space";
import {
  Button,
  Modal,
  Paper,
  Stack,
  TextInput,
  Text,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./spaces.module.css";
import {
  DotsThreeOutlineVertical,
  Gear,
  Plus,
  Notification,
} from "@phosphor-icons/react";

export function Spaces() {
  const { user } = useGlobalContext();
  const query = useQuery({
    queryKey: ["spaces", user],
    queryFn: getSpaces,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/spaces" });

  const [name, setName] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleCreateSpace = async () => {
    try {
      if (!user) return;
      await createSpace(name, user.id);
      queryClient.invalidateQueries({ queryKey: ["spaces", user] });
    } catch {
      console.log("unable to create space");
    }
    close();
  };

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <Text fw={700}>Eligos</Text>
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
            <Menu.Item leftSection={<Plus weight="bold" />} onClick={open}>
              new space
            </Menu.Item>
            <Menu.Item
              leftSection={<Notification weight="bold" />}
              onClick={() => navigate({ to: "/notifications" })}
            >
              notifications
            </Menu.Item>
            <Menu.Item leftSection={<Gear weight="bold" />}>settings</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <Modal opened={opened} onClose={close} centered title="New Space">
        <Stack>
          <TextInput
            label="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button onClick={handleCreateSpace}>save</Button>
        </Stack>
      </Modal>

      <Stack>
        {query.data?.map((space) => (
          <Paper
            radius="md"
            p="md"
            withBorder
            key={space.id}
            onClick={() =>
              navigate({
                to: "/spaces/$spaceid",
                params: { spaceid: space.id },
              })
            }
          >
            {space.name}
          </Paper>
        ))}
      </Stack>
    </main>
  );
}
