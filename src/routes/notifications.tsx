import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInvites } from "@/features/space";
import { useGlobalContext } from "@/context";
import { Title, Text, Group, ActionIcon } from "@mantine/core";
import { Check, X } from "@phosphor-icons/react";
import { acceptInvite, rejectInvite } from "@/features/space";
import classes from "./notifications.module.css";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  beforeLoad: async ({ context }) => {
    if (!context.user && !(await isAuthenticated())) {
      throw redirect({ to: "/" });
    }
  },
});

function Notifications() {
  const { user } = useGlobalContext();
  const invites = useQuery({
    queryKey: ["invites", user?.email],
    queryFn: () => getInvites(user?.email || ""),
    enabled: !!user,
  });
  const queryClient = useQueryClient();

  //TODO add refresh button to invalidate query
  return (
    <div className={classes.container}>
      <Title>Notifications</Title>

      <div>
        {invites.data?.map((invite) => (
          <Group
            justify="space-between"
            className={classes.card}
            key={invite.id}
          >
            <Text>
              You're invited to join{" "}
              <Text component="span" c="blue">
                {invite.spaceName}
              </Text>
            </Text>
            <ActionIcon.Group>
              <ActionIcon
                variant="light"
                size="lg"
                onClick={() => {
                  try {
                    acceptInvite(invite);
                    queryClient.setQueryData(
                      ["invites", user?.email],
                      (prevData: Invite[]) => {
                        if (prevData) {
                          return prevData.filter(
                            (item) => item.id !== invite.id
                          );
                        }
                        return prevData;
                      }
                    );
                    queryClient.invalidateQueries({ queryKey: ["spaces"] });
                  } catch (err) {
                    if (err instanceof Error) console.log(err.message);
                  }
                }}
              >
                <Check />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="lg"
                onClick={() => {
                  try {
                    rejectInvite(invite);
                    queryClient.setQueryData(
                      ["invites", user?.email],
                      (prevData: Invite[]) => {
                        if (prevData) {
                          return prevData.filter(
                            (item) => item.id !== invite.id
                          );
                        }
                        return prevData;
                      }
                    );
                  } catch (err) {
                    if (err instanceof Error) console.log(err.message);
                  }
                }}
              >
                <X />
              </ActionIcon>
            </ActionIcon.Group>
          </Group>
        ))}
      </div>
    </div>
  );
}
