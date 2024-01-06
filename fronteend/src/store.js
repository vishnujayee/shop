import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Features/productSlice";
import userSlice from "./Features/userSlice";
import { orderslicee , cart} from "./Features/orderslice";
import appApi from "./services/appapi";
import moreapi from "./services/moreapi";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    orders:orderslicee,
    // cart :cart,
    [appApi.reducerPath]: appApi.reducer,
    [moreapi.reducerPath]:moreapi.reducer,
});


const store = configureStore({
    reducer: reducer,
    middleware: [thunk, appApi.middleware , moreapi.middleware],
});

export default store;