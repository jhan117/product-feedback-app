import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { statusList } from "../utils/nameList";
import { getAllComments, getLastId } from "../utils/getCnt";
import {
  addComment,
  addReply,
  fetchData,
  updateUpvoteData,
} from "./suggestions-thunks";

interface SuggestionsState {
  currentUser: CurrentUser;
  suggestionItems: Suggestion[];
  statusItems: StatusItem[];
  isLoading: boolean;
  error: string | undefined;
  sugId: string;
  curLastIds: { sug: number; comment: number; reply: number };
}

const initialState: SuggestionsState = {
  currentUser: {
    image: "string",
    name: "string",
    username: "string",
    upvoteItems: [],
  },
  suggestionItems: [],
  statusItems: statusList
    .slice(1)
    .map((item) => ({ ...item, items: [], length: 0 })),
  isLoading: true,
  error: undefined,
  sugId: "",
  curLastIds: { sug: 0, comment: 0, reply: 0 },
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: initialState,
  reducers: {
    changeSug(state, action) {
      state.sugId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { request, user } = action.payload;

        const statusItems = state.statusItems.map((statusItem) => {
          const items = request.filter(
            (suggestion: Suggestion) =>
              suggestion.status === statusItem.name.toLowerCase()
          );
          return {
            ...statusItem,
            items,
            length: items.length,
          };
        });
        state.currentUser = user;
        state.suggestionItems = request;
        state.statusItems = statusItems;
        state.isLoading = false;
        state.curLastIds = getLastId(request);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateUpvoteData.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateUpvoteData.fulfilled, (state, action) => {
        const { sugId, upvotes, isUpvoted } = action.payload;

        state.suggestionItems.find((item) => item.id === sugId)!.upvotes =
          upvotes;

        if (isUpvoted) {
          state.currentUser.upvoteItems = state.currentUser.upvoteItems!.filter(
            (item) => item !== sugId
          );
        } else {
          state.currentUser.upvoteItems!.push(sugId);
        }
      })
      .addCase(updateUpvoteData.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addReply.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        const { sugId, commentId, reply } = action.payload;

        const cId = `c${commentId}`;
        const rId = `r${reply.id}`;

        const comment = state.suggestionItems.find(
          (item) => item.id === Number(sugId)
        )!.comments![cId];
        if (comment.hasOwnProperty("replies")) comment.replies![rId] = reply;
        else {
          comment.replies = { [rId]: reply };
        }
        state.curLastIds.reply += 1;
      })
      .addCase(addReply.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addComment.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { sugId, comment } = action.payload;

        const cId = `c${comment.id}`;

        const sug = state.suggestionItems.find(
          (item) => item.id === Number(sugId)
        )!;
        if (sug.hasOwnProperty("comments")) sug.comments![cId] = comment;
        else {
          sug.comments = { [cId]: comment };
        }

        state.curLastIds.comment += 1;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const suggestionsActions = suggestionsSlice.actions;

export default suggestionsSlice;

export const selectFilteredSugs = createSelector(
  [
    (state): Suggestion[] => state.suggestions.suggestionItems,
    (state): string => state.select.filter,
  ],
  (items, filter) => {
    if (filter === "All") {
      return { items, length: items.length };
    }

    const filteredItems = items.filter(
      (item) => item.category === filter.toLowerCase()
    );
    return { items: filteredItems, length: filteredItems.length };
  }
);

export const selectSortedSugs = createSelector(
  [selectFilteredSugs, (state): string => state.select.sort],
  (sugs, sort) => {
    const items = [...sugs.items];

    switch (sort) {
      case "s1":
        return items.sort((a, b) => b.upvotes - a.upvotes);
      case "s2":
        return items.sort((a, b) => a.upvotes - b.upvotes);
      case "s3":
        return items.sort(
          (a, b) => getAllComments(b.comments!) - getAllComments(a.comments!)
        );
      case "s4":
        return items.sort(
          (a, b) => getAllComments(a.comments!) - getAllComments(b.comments!)
        );
      default:
        break;
    }
  }
);

export const selectSugById = createSelector(
  [
    (state): Suggestion[] => state.suggestionItems,
    (state): string => state.sugId,
  ],
  (items, sugId) => {
    return items.find((item) => item.id === Number(sugId));
  }
);
