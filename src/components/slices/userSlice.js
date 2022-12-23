import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const baseApi = process.env.baseApi;
const url = `${baseApi}/user/user/detail-info`;

const initialState = {
	userInfo:{},
	isLoading:true,
};

export const getUserInfo = createAsyncThunk(
		'getUserInfo',
		async (name,thunkAPI) => {
			try {
				const resp = await axios(url);
				return resp.data;
			} catch (error) {
				return thunkAPI.rejectWithValue('something went wrong');
			}
		}
);

const getUserInfoSlice = createSlice({
	name:'userInfo',
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder.addCase(getUserInfo.pending,(state) => {
			state.isLoading = true;
		}).addCase(getUserInfo.fulfilled,(state,action) => {
			state.isLoading = false;
			state.userInfo = action.payload;
		}).addCase(getUserInfo.rejected,(state,action) => {
			state.isLoading = false;
		});
	},

});


export default getUserInfoSlice.reducer;