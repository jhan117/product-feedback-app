declare module "*.module.css";
declare module "*.svg";

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
  user: {};
  id: number;
  content: string;
  replies?: Reply[];
}

interface Reply {
  user: {};
  content: string;
  replyingTo: string;
}

interface StatusItem {
  id: string;
  name: string;
  items: Suggestion[];
  length: number;
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
