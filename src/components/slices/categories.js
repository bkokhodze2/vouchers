import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseApi = process.env.baseApi;
const url = `${baseApi}/providers/categories`;

const initialState = {
	categoriesList:[],
	amount:0,
	isLoading:true,
};

export const getCategories = createAsyncThunk(
		'getCategories',
		async (name,thunkAPI) => {
			try {
				const resp = await axios(url);
				return resp.data;
			} catch (error) {
				return thunkAPI.rejectWithValue('something went wrong');
			}
		}
);

const categories = createSlice({
	name:'categories',
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder.addCase(getCategories.pending,(state) => {
			state.isLoading = true;
		}).addCase(getCategories.fulfilled,(state,action) => {
			state.isLoading = false;
			state.categoriesList = action.payload;
			state.amount = action.payload.length;
		}).addCase(getCategories.rejected,(state,action) => {
			console.log(action);
			state.isLoading = false;
		});
	},
});


export default categories.reducer;