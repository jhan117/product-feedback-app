import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

import request from "../utils/request";

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const REQUEST_URL = `${BASE_URL}/productRequests`;
const USER_URL = `${BASE_URL}/currentUser`;
const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

interface UpvotePayload {
  sugId: number;
  upvotes: number;
  isUpvoted: boolean;
}

interface UpvoteResponse {
  sugId: number;
  upvotes: number;
  isUpvoted: boolean;
}

interface ReplyThunk {
  sugId: string;
  commentId: number;
  reply: Reply;
}

interface CommentThunk {
  sugId: string;
  comment: CommentItem;
}

export const fetchData = createAsyncThunk<
  {
    request: Suggestion[];
    user: CurrentUser;
  },
  void
>("suggestions/fetchData", async (data, thunkAPI) => {
  try {
    const requestResponse = await request.get(`${REQUEST_URL}.json`);
    const userResponse = await request.get(`${USER_URL}.json`);
    const requestData = await requestResponse.json();
    const userData = await userResponse.json();

    const upvoteItems =
      userData.upvoteItems && Object.keys(userData.upvoteItems).map(Number);

    return {
      request: requestData ? Object.values(requestData) : [],
      user: { ...userData, upvoteItems },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to get data");
  }
});

export const loginAsGuest = createAsyncThunk<string, void>(
  "suggestions/loginAsGuest",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnSecureToken: true }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Firebase Auth Error:", errorData);
        throw new Error("Failed to authenticate as guest.");
      }
      const data = await response.json();
      return data.idToken;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to login as guest");
    }
  }
);

export const updateUpvoteData = createAsyncThunk<
  UpvoteResponse,
  UpvotePayload,
  { state: RootState }
>(
  "suggestions/updateUpvoteData",
  async ({ sugId, upvotes, isUpvoted }, thunkAPI) => {
    let editedUpvotes = upvotes + 1;
    if (isUpvoted) {
      editedUpvotes = upvotes - 1;
    }

    const { token } = thunkAPI.getState().suggestions;
    const auth = token ? `?auth=${token}` : "";

    const upvoteDataURL = `${REQUEST_URL}/p${sugId}.json${auth}`;
    const upvoteItemURL = `${USER_URL}/upvoteItems/${sugId}.json${auth}`;

    try {
      await request.patch(upvoteDataURL, {
        upvotes: editedUpvotes,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update upvote data");
    }

    try {
      if (isUpvoted) {
        await request.delete(upvoteItemURL);
      } else {
        await request.patch(upvoteItemURL, { sugId });
      }
      return { sugId, upvotes: editedUpvotes, isUpvoted };
    } catch (error) {
      await request.patch(upvoteDataURL, {
        upvotes: upvotes,
      });
      return thunkAPI.rejectWithValue("Failed to update upvote data");
    }
  }
);

export const addReply = createAsyncThunk<
  ReplyThunk,
  ReplyThunk,
  { state: RootState }
>(
  "suggestions/addReply",
  async ({ sugId, commentId, reply }, thunkAPI) => {
    const { token } = thunkAPI.getState().suggestions;
    const replyURL = `${REQUEST_URL}/p${sugId}/comments/c${commentId}/replies/r${reply.id}.json${token ? `?auth=${token}` : ""}`;

    try {
      await request.patch(replyURL, reply);
      return { sugId, commentId, reply };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add reply");
    }
  }
);

export const addComment = createAsyncThunk<
  CommentThunk,
  CommentThunk,
  { state: RootState }
>(
  "suggestions/addComment",
  async ({ sugId, comment }, thunkAPI) => {
    const { token } = thunkAPI.getState().suggestions;
    const commentURL = `${REQUEST_URL}/p${sugId}/comments/c${comment.id}.json${token ? `?auth=${token}` : ""}`;

    try {
      await request.patch(commentURL, comment);
      return { sugId, comment };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add comment");
    }
  }
);

export const editSug = createAsyncThunk<
  Suggestion,
  Suggestion,
  { state: RootState }
>(
  "suggestions/editSug",
  async (feedback, thunkAPI) => {
    const { token } = thunkAPI.getState().suggestions;
    const sugURL = `${REQUEST_URL}/p${feedback.id}.json${token ? `?auth=${token}` : ""}`;

    try {
      await request.put(sugURL, feedback);
      return feedback;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to edit current feedback");
    }
  }
);

export const deleteSug = createAsyncThunk<
  { sugId: number; hasUpvote: boolean },
  number,
  { state: RootState }
>("suggestions/deleteSug", async (sugId, thunkAPI) => {
  const { upvoteItems } = thunkAPI.getState().suggestions.currentUser;
  const { token } = thunkAPI.getState().suggestions;
  const auth = token ? `?auth=${token}` : "";
  let hasUpvote = false;
  const upvoteItemsURL = `${USER_URL}/upvoteItems/${sugId}.json${auth}`;
  const sugURL = `${REQUEST_URL}/p${sugId}.json${auth}`;

  if (upvoteItems?.find((v) => v === sugId)) {
    hasUpvote = true;

    try {
      await request.delete(upvoteItemsURL);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete your upvote data");
    }
  }

  try {
    await request.delete(sugURL);
    return { sugId, hasUpvote };
  } catch (error) {
    if (hasUpvote) await request.patch(upvoteItemsURL, { sugId });
    return thunkAPI.rejectWithValue("Failed to delete current feedback");
  }
});

export const addSug = createAsyncThunk<
  Suggestion,
  Suggestion,
  { state: RootState }
>(
  "suggestions/addSug",
  async (feedback, thunkAPI) => {
    const { token } = thunkAPI.getState().suggestions;
    const sugURL = `${REQUEST_URL}/p${feedback.id}.json${token ? `?auth=${token}` : ""}`;

    try {
      await request.put(sugURL, feedback);
      return feedback;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add new feedback");
    }
  }
);
