import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSilce";
import { userApi } from "@/services/usersApi";
import { randomUserApi } from "@/services/randomUserApir";
export const store = configureStore({
  reducer: {
    userState: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [randomUserApi.reducerPath]: randomUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, randomUserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
