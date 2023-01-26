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
  if (!requestResponse.ok) {
    throw new Error("Could not fetch suggestions data!");
  }
  const requestData = await requestResponse.json();

  const userResponse = await request.get(`${USER_URL}.json`);
  if (!userResponse.ok) {
    throw new Error("Could not fetch user data!");
  }
  const userData = await userResponse.json();
  return { requestData, userData };
});

export const updateUpvoteData = createAsyncThunk(
  "suggestions/updateUpvoteData",
  async ({ sugId, upvotes, isUpvoted }: UpvotePayload) => {
    let editedUpvotes = upvotes + 1;
    if (isUpvoted) {
      editedUpvotes = upvotes - 1;
    }

    const patchResponse = await request.patch(`${REQUEST_URL}/${sugId}.json`, {
      upvotes: editedUpvotes,
    });
    if (!patchResponse.ok) {
      throw new Error("Could not update upvote data!");
    }

    let putResponse;
    if (isUpvoted) {
      putResponse = await request.delete(
        `${USER_URL}/upvoteItems/${sugId}.json`
      );
    } else {
      putResponse = await request.post(
        `${USER_URL}/upvoteItems/${sugId}.json`,
        sugId
      );
    }
    if (!putResponse.ok) {
      throw new Error("Could not update user upvote data!");
    }
    return { sugId, upvotes: editedUpvotes, isUpvoted };
  }
);
