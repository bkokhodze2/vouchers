import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import favouritesReducer from "../slices/favouritesSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		favourites: favouritesReducer
	}
})

// export default the store
export default store
