import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import favouritesReducer from "../slices/favouritesSlice";
import categoriesReducer from '../slices/categoriesSlice';
import userInfo from '../slices/userSlice';

const store = configureStore({
	reducer:{
		cart:cartReducer,
		favourites:favouritesReducer,
		categories:categoriesReducer,
		userInfo:userInfo
	}
})

// export default the store
export default store
