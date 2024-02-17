
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