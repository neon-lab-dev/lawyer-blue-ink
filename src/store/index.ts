import { configureStore } from "@reduxjs/toolkit";
import templateReducers from "./slices/templates";
import { TypedUseSelectorHook, useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    templates: templateReducers,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
