declare module "*.module.css";
declare module "*.svg";
declare module "*.jpg";

interface Suggestion {
  id: number;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments: Comment[];
}

interface Comment {
  user: User;
  id: number;
  content: string;
  replies?: Reply[];
}

interface Reply {
  user: User;
  content: string;
  replyingTo: string;
}

interface StatusItem {
  id: string;
  name: string;
  items: Suggestion[];
  length: number;
}

interface User {
  image: string;
  name: string;
  username: string;
}

// nameList
interface Item {
  id: string;
  name: string;
}

interface Pos {
  top: number;
  left: number;
}
