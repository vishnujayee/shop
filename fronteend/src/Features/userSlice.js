import {createSlice} from '@reduxjs/toolkit'
import appApi from '../services/appapi'
const initialstate = null;
export const userSlice = createSlice({
    name:'user',
    initialState:initialstate,
    reducers:{
        logout: ()=> {
            return initialstate;
        },
    },
    extraReducers:(builder) =>{
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled,(state,{payload})=>{
        });
        builder.addMatcher(appApi.endpoints.login.matchFulfilled,(state,{payload})=>{
            return {...payload};
        });
        builder.addMatcher(appApi.endpoints.logintoken.matchFulfilled,(state,{payload})=>{
            return{...payload}
        })
        builder.addMatcher(appApi.endpoints.addcart.matchFulfilled,(state ,{payload})=>{
            return { ...payload}
        })
        // builder.addMatcher(appApi.endpoints.getcart.matchFulfilled,(state ,{payload})=>{
        //     return { ...payload}
        // })
        builder.addMatcher(appApi.endpoints.removecart.matchFulfilled,(state ,{payload})=>{
            return { ...payload}
        })
        
    }
});
export const  {logout} = userSlice.actions;
export default userSlice.reducer;