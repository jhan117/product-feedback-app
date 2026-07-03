export interface CurrentUser {
  image: string;
  name: string;
  username: string;
  upvoteItems?: Record<string, boolean>;
}

export interface FeedbackItem {
  title: string;
  category: string;
  status: string;
  description: string;
}

export interface Suggestion {
  id: string;
  category: string;
  description: string;
  status: string;
  title: string;
  upvotes: number;
  comments?: Comments;
}

export interface Suggestions {
  [key: string]: Suggestion;
}

export interface CommentItem {
  id: string;
  user: User;
  content: string;
  replies?: Replies;
}

export interface Comments {
  [key: string]: CommentItem;
}

export interface Reply {
  id: string;
  user: User;
  content: string;
  replyingTo: string;
}

export interface Replies {
  [id: string]: Reply;
}

export interface StatusItem {
  id: string;
  name: string;
  items: Suggestion[];
  length: number;
}

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Item {
  id: string;
  name: string;
}

export interface Pos {
  top: number;
  left: number;
}

export interface PageProps {
  showError: boolean;
  handler: () => void;
}
