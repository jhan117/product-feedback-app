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

export const fetchData = createAsyncThunk("suggestions/fetchData", async () => {
  const requestResponse = await request.get(`${REQUEST_URL}.json`);
  const userResponse = await request.get(`${USER_URL}.json`);

  const requestData = await requestResponse.json();
  const userData = await userResponse.json();

  return { requestData, userData };
});

export const updateUpvoteData = createAsyncThunk(
  "suggestions/updateUpvoteData",
  async ({ sugId, upvotes, isUpvoted }: UpvotePayload, thunkAPI) => {
    let editedUpvotes = upvotes + 1;
    if (isUpvoted) {
      editedUpvotes = upvotes - 1;
    }

    const upvoteDataURL = `${REQUEST_URL}/${sugId}.json`;
    const upvoteItemURL = `${USER_URL}/upvoteItems/${sugId}.json`;

    await request.patch(upvoteDataURL, {
      upvotes: editedUpvotes,
    });

    try {
      if (isUpvoted) {
        await request.delete(upvoteItemURL);
      } else {
        await request.post(upvoteItemURL, sugId);
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
