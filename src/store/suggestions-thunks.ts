import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

import request from "../utils/request";

const REQUEST_URL =
  "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests";
const USER_URL =
  "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/currentUser";

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
    request: any[];
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
      request: Object.values(requestData),
      user: { ...userData, upvoteItems },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to get data");
  }
});

export const updateUpvoteData = createAsyncThunk<UpvoteResponse, UpvotePayload>(
  "suggestions/updateUpvoteData",
  async ({ sugId, upvotes, isUpvoted }, thunkAPI) => {
    let editedUpvotes = upvotes + 1;
    if (isUpvoted) {
      editedUpvotes = upvotes - 1;
    }

    const upvoteDataURL = `${REQUEST_URL}/p${sugId}.json`;
    const upvoteItemURL = `${USER_URL}/upvoteItems/${sugId}.json`;

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

export const addReply = createAsyncThunk<ReplyThunk, ReplyThunk>(
  "suggestions/addReply",
  async ({ sugId, commentId, reply }, thunkAPI) => {
    const replyURL = `${REQUEST_URL}/p${sugId}/comments/c${commentId}/replies/r${reply.id}.json`;

    try {
      await request.patch(replyURL, reply);
      return { sugId, commentId, reply };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add reply");
    }
  }
);

export const addComment = createAsyncThunk<CommentThunk, CommentThunk>(
  "suggestions/addComment",
  async ({ sugId, comment }, thunkAPI) => {
    const commentURL = `${REQUEST_URL}/p${sugId}/comments/c${comment.id}.json`;

    try {
      await request.patch(commentURL, comment);
      return { sugId, comment };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add comment");
    }
  }
);

export const editSug = createAsyncThunk<Suggestion, Suggestion>(
  "suggestions/editSug",
  async (feedback, thunkAPI) => {
    const sugURL = `${REQUEST_URL}/p${feedback.id}.json`;

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
  let hasUpvote = false;
  const upvoteItemsURL = `${USER_URL}/upvoteItems/${sugId}.json`;
  const sugURL = `${REQUEST_URL}/p${sugId}.json`;

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

export const addSug = createAsyncThunk<Suggestion, Suggestion>(
  "suggestions/addSug",
  async (feedback, thunkAPI) => {
    const sugURL = `${REQUEST_URL}/p${feedback.id}.json`;

    try {
      await request.put(sugURL, feedback);
      return feedback;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add new feedback");
    }
  }
);
