import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

import { statusList } from "../utils/nameList";
import { getAllComments, getLastId } from "../utils/getCnt";
import {
  addComment,
  addReply,
  addSug,
  deleteSug,
  editSug,
  fetchData,
  updateUpvoteData,
  loginAsGuest,
} from "./suggestions-thunks";

interface SuggestionsState {
  currentUser: CurrentUser;
  suggestionItems: Suggestion[];
  isLoading: boolean;
  error: string | undefined;
  sugId: string;
  curLastIds: { sug: number; comment: number; reply: number };
  fulfilled: string;
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: SuggestionsState = {
  currentUser: {
    image: "string",
    name: "string",
    username: "string",
    upvoteItems: [],
  },
  suggestionItems: [],
  isLoading: true,
  error: undefined,
  sugId: "",
  curLastIds: { sug: 0, comment: 0, reply: 0 },
  fulfilled: "",
  isLoggedIn: false,
  token: null,
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: initialState,
  reducers: {
    changeSug(state, action) {
      state.sugId = action.payload;
    },
    cancelError(state) {
      state.error = undefined;
    },
    changeFulfilled(state) {
      state.fulfilled = "";
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
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

        state.currentUser = user;
        state.suggestionItems = request;
        state.isLoading = false;
        state.curLastIds = getLastId(request);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(loginAsGuest.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginAsGuest.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginAsGuest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(updateUpvoteData.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateUpvoteData.fulfilled, (state, action) => {
        const { sugId, upvotes, isUpvoted } = action.payload;

        const item = state.suggestionItems.find((item) => item.id === sugId);
        if (item) item.upvotes = upvotes;

        if (isUpvoted) {
          state.currentUser.upvoteItems = state.currentUser.upvoteItems?.filter(
            (item) => item !== sugId
          );
        } else {
          if (!state.currentUser.upvoteItems) state.currentUser.upvoteItems = [];
          state.currentUser.upvoteItems.push(sugId);
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

        const sug = state.suggestionItems.find((item) => item.id === Number(sugId));
        if (sug && sug.comments) {
          const comment = sug.comments[cId];
          if (comment) {
            if (comment.hasOwnProperty("replies") && comment.replies) {
              comment.replies[rId] = reply;
            } else {
              comment.replies = { [rId]: reply };
            }
          }
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

        const sug = state.suggestionItems.find((item) => item.id === Number(sugId));
        if (sug) {
          if (sug.hasOwnProperty("comments") && sug.comments) {
            sug.comments[cId] = comment;
          } else {
            sug.comments = { [cId]: comment };
          }
        }

        state.curLastIds.comment += 1;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(editSug.pending, (state) => {
        state.error = undefined;
      })
      .addCase(editSug.fulfilled, (state, action) => {
        const feedback = action.payload;

        const sug = state.suggestionItems.find((item) => item.id === feedback.id);
        if (sug) {
          sug.title = feedback.title;
          sug.category = feedback.category;
          sug.description = feedback.description;
          sug.status = feedback.status;
        }
        state.fulfilled = "edit";
      })
      .addCase(editSug.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteSug.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteSug.fulfilled, (state, action) => {
        const { sugId, hasUpvote } = action.payload;

        state.suggestionItems = state.suggestionItems.filter(
          (item) => item.id !== sugId
        );

        if (hasUpvote) {
          state.currentUser.upvoteItems = state.currentUser.upvoteItems?.filter(
            (v) => v !== sugId
          );
        }
        state.fulfilled = "delete";
      })
      .addCase(deleteSug.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addSug.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addSug.fulfilled, (state, action) => {
        const feedback = action.payload;

        state.suggestionItems.push(feedback);

        state.fulfilled = "new";
      })
      .addCase(addSug.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const suggestionsActions = suggestionsSlice.actions;

export default suggestionsSlice;

const FilteredStatus = statusList.slice(1);
export const selectSugsByStatusAll = createSelector(
  [(state: RootState): Suggestion[] => state.suggestions.suggestionItems],
  (sugs) => {
    return FilteredStatus.map((status) => {
      const items = sugs.filter(
        (sug) => sug.status === status.name.toLowerCase()
      );

      return { ...status, items, length: items.length };
    });
  }
);

export const selectSugsByStatus = createSelector(
  [selectSugsByStatusAll, (state: RootState, status: string): string => status],
  (items, status) => {
    return items.find((item) => item.id === status);
  }
);

export const selectFilteredSugs = createSelector(
  [
    (state: RootState): Suggestion[] => state.suggestions.suggestionItems,
    (state: RootState, filter: string): string => filter,
  ],
  (items, filter) => {
    if (filter === "all") {
      return { items, length: items.length };
    }
    const filteredItems = items.filter((item) => item.category === filter);
    return { items: filteredItems, length: filteredItems.length };
  }
);

export const selectSortedSugs = createSelector(
  [selectFilteredSugs, (state: RootState, filter: string, sort: string): string => sort],
  (sugs, sort) => {
    const items = [...sugs.items];

    switch (sort) {
      case "most_upvotes":
        return items.sort((a, b) => b.upvotes - a.upvotes);
      case "least_upvotes":
        return items.sort((a, b) => a.upvotes - b.upvotes);
      case "most_comments":
        return items.sort(
          (a, b) => getAllComments(b.comments || {}) - getAllComments(a.comments || {})
        );
      case "least_comments":
        return items.sort(
          (a, b) => getAllComments(a.comments || {}) - getAllComments(b.comments || {})
        );
      default:
        break;
    }
  }
);

export const selectSugById = createSelector(
  [
    (state: RootState): Suggestion[] => state.suggestions.suggestionItems,
    (state: RootState): string => state.suggestions.sugId,
  ],
  (items, sugId) => {
    return items.find((item) => item.id === Number(sugId));
  }
);
