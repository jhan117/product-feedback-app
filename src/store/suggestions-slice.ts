import { createSlice, createSelector } from "@reduxjs/toolkit";

import { statusList } from "../utils/nameList";
import { getAllComments } from "../utils/getCommentsCnt";
import { fetchData, updateUpvoteData } from "./suggestions-thunks";

interface SuggestionsState {
  suggestionItems: Suggestion[];
  statusItems: StatusItem[];
  upvoteItems: number[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: SuggestionsState = {
  suggestionItems: [],
  statusItems: statusList
    .slice(1)
    .map((item) => ({ ...item, items: [], length: 0 })),
  upvoteItems: [],
  isLoading: true,
  errorMessage: null,
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.errorMessage = null;
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { requestData, userData } = action.payload;
        const statusItems = state.statusItems.map((statusItem) => {
          const items = requestData.filter(
            (suggestion: Suggestion) =>
              suggestion.status === statusItem.name.toLowerCase()
          );
          return {
            ...statusItem,
            items,
            length: items.length,
          };
        });

        state.suggestionItems = requestData;
        state.statusItems = statusItems;
        state.isLoading = false;
        if (userData.upvoteItems) {
          state.upvoteItems = Object.keys(userData.upvoteItems).map(Number);
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        const error = action.payload as string;
        state.errorMessage = error;
      })
      .addCase(updateUpvoteData.fulfilled, (state, action) => {
        const { sugId, upvotes, isUpvoted } = action.payload;
        state.suggestionItems[sugId].upvotes = upvotes;

        if (isUpvoted) {
          state.upvoteItems = state.upvoteItems.filter(
            (item) => item !== sugId
          );
        } else {
          state.upvoteItems.push(sugId);
        }
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
          (a, b) => getAllComments(b.comments) - getAllComments(a.comments)
        );
      case "s4":
        return items.sort(
          (a, b) => getAllComments(a.comments) - getAllComments(b.comments)
        );
      default:
        break;
    }
  }
);
