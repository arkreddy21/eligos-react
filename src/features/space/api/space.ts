import { api } from "@/lib/ky";
import { HTTPError } from "ky";

export async function createSpace(name: string, userid: string) {
  try {
    await api.post("space/create", { json: { name, userid } });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function getSpaces() {
  try {
    const res = await api.get("space/spaces").json();
    return res as Array<Space>;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function getMessages(spaceid: string) {
  try {
    const res = await api
      .get("space/messages", { searchParams: {spaceid} })
      .json();
    return res as Array<MessageWUser>;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function inviteUser(spaceid: string, spaceName: string, email: string) {
  try {
    await api.post("invite/create", { json: { spaceid, spaceName, email } });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function getInvites(email: string) {
  try {
    const res = await api.get("invite/get", { searchParams: { email } }).json();
    return res as Array<Invite>;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function acceptInvite(invite: Invite) {
  try {
    await api.post("invite/accept", { json: invite });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function rejectInvite(invite: Invite) {
  try {
    await api.post("invite/reject", { json: invite });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}
