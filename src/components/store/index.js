import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import favouritesReducer from "../slices/favouritesSlice";
import categoriesReducer from '../slices/categories';

const store = configureStore({
	reducer:{
		cart:cartReducer,
		favourites:favouritesReducer,
		categories:categoriesReducer,
	}
})

// export default the store
export default store
