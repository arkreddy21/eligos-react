interface User {
  id: string;
  name: string;
  email: string;
}

interface Space {
  id: string;
  name: string;
}

interface Message {
  id: string;
  userid: string;
  spaceid: string;
  body: string;
  createdAt: string;
}

interface MessageWUser extends Message {
  user: User;
}

interface WsMessage {
  proto: string;
  spaceid: string;
  payload: unknown;
}

interface Invite {
  id: string;
  spaceid: string;
  spaceName: string;
  email: string;
}