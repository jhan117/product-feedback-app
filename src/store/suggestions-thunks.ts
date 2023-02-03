import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchData = createAsyncThunk<{
  request: any[];
  user: CurrentUser;
}>("suggestions/fetchData", async () => {
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

    await request.patch(upvoteDataURL, {
      upvotes: editedUpvotes,
    });

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
      return thunkAPI.rejectWithValue("error");
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);
