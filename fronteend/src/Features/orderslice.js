import {createSlice} from '@reduxjs/toolkit'
import moreapi from '../services/moreapi'
const initialstate = [];
const cartState = [];
export const orderslicee = createSlice({
    name:'orders',
    initialState:initialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher(moreapi.endpoints.getorders.matchFulfilled,(state,{payload})=>{
            return payload;
        });
    }
});
export const cart =createSlice({
    name:'cart',
    initialState:initialstate,
    reducers:{},
    extraReducers:(builder)=>{
    }
});