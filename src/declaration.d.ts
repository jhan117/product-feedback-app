declare module "*.module.css";
declare module "*.svg";
declare module "*.jpg";

interface CurrentUser {
  image: string;
  name: string;
  username: string;
  upvoteItems?: number[];
}

interface FeedbackItem {
  title: string;
  category: string;
  status: string;
  description: string;
}

interface Suggestion {
  id: number;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments?: Comments;
}

interface Suggestions {
  [key: string]: Suggestion;
}

interface CommentItem {
  id: number;
  user: User;
  content: string;
  replies?: Replies;
}

interface Comments {
  [key: string]: CommentItem;
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

interface PageProps {
  showError: boolean;
  handler: () => void;
}
