
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
  userid: string;
  spaceid: string;
  body: string;
  createdAt: string;
}
