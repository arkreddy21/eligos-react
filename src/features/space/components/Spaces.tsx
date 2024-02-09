import { useGlobalContext } from "@/context";
import { createSpace, getSpaces } from "@/features/space";
import { Button, Modal, Paper, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./spaces.module.css"

export function Spaces() {
  const { user } = useGlobalContext();
  const query = useQuery({
    queryKey: ["spaces", user],
    queryFn: getSpaces,
  });
  const navigate = useNavigate({ from: "/spaces" });

  const [name, setName] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleCreateSpace = async () => {
    try {
      await createSpace(name, user.id);
    } catch {
      console.log("unable to create space");
    }
    close();
  };

  return (
    <main className={classes.container} >
      <Button onClick={open}>new space</Button>
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
            radius="lg"
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
