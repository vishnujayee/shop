import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Features/productSlice";
import userSlice from "./Features/userSlice";
import appApi from "./services/appapi";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});


const store = configureStore({
    reducer: reducer,
    middleware: [thunk, appApi.middleware],
});

export default store;