import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	favouritesList:typeof window !== 'undefined' && localStorage?.getItem("favouritesList")
			? JSON.parse(localStorage?.getItem("favouritesList"))
			: [],
	favouritesTotalCount:0,
};

const favouritesSlices = createSlice({
	name:"favourites",
	initialState,
	reducers:{
		addToFavourites(state,action){

			const existingIndex = state.favouritesList.findIndex(
					(item) => {
						return _.get(item,'additionalInfo[0].genericTransactionTypeId',1) === _.get(action,'payload.additionalInfo[0].genericTransactionTypeId',1)
					}
			);

			if (existingIndex >= 0) {

				state.favouritesList = state.favouritesList.filter(
						(item) => {
							return _.get(item,'additionalInfo[0].genericTransactionTypeId',1) !== _.get(action,'payload.additionalInfo[0].genericTransactionTypeId',1)
						}
				)
			}
			else {
				state.favouritesList.push({...action.payload});
			}

			typeof window !== 'undefined' && localStorage.setItem("favouritesList",JSON.stringify(state.favouritesList));

		},
		clearFavourites(state,action){
			state.favouritesList = [];
			typeof window !== 'undefined' && localStorage.setItem("favouritesList",JSON.stringify(state.favouritesList));
		},
		getTotalsFavourite(state,action){
			state.favouritesTotalCount = state.favouritesList.length;
		},
	},
});

export const {addToFavourites,clearFavourites,getTotalsFavourite} = favouritesSlices.actions;

export default favouritesSlices.reducer;