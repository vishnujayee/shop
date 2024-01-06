import {createSlice} from '@reduxjs/toolkit'
import appApi from '../services/appapi'
const initialstate = [];
export const productSlice = createSlice({
    name:'Products',
    initialState:initialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher(appApi.endpoints.addproduct.matchFulfilled,(state,{payload})=>{
            return payload
        })
        builder.addMatcher(appApi.endpoints.getproduct.matchFulfilled,(state ,{payload})=>{
            return payload
        })
        builder.addMatcher(appApi.endpoints.productdetail.matchFulfilled,(state ,{payload})=>{
            return payload
        })
       
    }
});
export default productSlice.reducer;