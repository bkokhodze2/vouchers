import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import favouritesReducer from "../slices/favouritesSlice";
// import {RemarksSlice} from "../slices/categories";

const store = configureStore({
	reducer:{
		cart:cartReducer,
		favourites:favouritesReducer,
		// RemarksSlice:RemarksSlice
	}
})

// export default the store
export default store
