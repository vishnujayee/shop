import {createSlice} from '@reduxjs/toolkit'
import appApi from '../services/appapi'
const initialstate = [];
export const productSlice = createSlice({
    name:'Products',
    initialState:initialstate,
    reducers:{}
    
});
export default productSlice.reducer;