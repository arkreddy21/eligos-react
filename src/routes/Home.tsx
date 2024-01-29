import { useGlobalContext } from "@/context";
import { createSpace, getSpaces } from "@/features/space";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function Home() {
  const { user } = useGlobalContext();
  const query = useQuery({
    queryKey: ["spaces", user],
    queryFn: getSpaces,
  });

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
    <>
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
          <div key={space.id}>{space.name}</div>
        ))}
      </Stack>
    </>
  );
}
