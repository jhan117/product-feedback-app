declare module "*.module.css";
declare module "*.svg";
declare module "*.jpg";

interface CurrentUser {
  image: string;
  name: string;
  username: string;
  upvoteItems?: number[];
}

interface Suggestion {
  id: number;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments: Comments;
}

interface Suggestions {
  [id: string]: Suggestion;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  replies?: Replies;
}

interface Comments {
  [id: string]: Comment;
}

interface Reply {
  id: number;
  user: User;
  content: string;
  replyingTo: string;
}

interface Replies {
  [id: string]: Reply;
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
