import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	cartItems: typeof window !== 'undefined' && localStorage?.getItem("cartItems")
			? JSON.parse(localStorage?.getItem("cartItems"))
			: [],
	cartTotalQuantity: 0,
	cartTotalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {

			const existingIndex = state.cartItems.findIndex(
					(item) => _.get(item, '[0]additionalInfo[0].genericTransactionTypeId', 1) === _.get(action, 'payload[0].additionalInfo[0].genericTransactionTypeId', 1)
			);

			console.log("existingIndex", existingIndex)

			if (existingIndex >= 0) {
				state.cartItems[existingIndex] = {
					...state.cartItems[existingIndex],
					cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
				};

			} else {
				let tempProductItem = {...action.payload, cartQuantity: 1};
				state.cartItems.push(tempProductItem);

			}
			typeof window !== 'undefined' && localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		decreaseCart(state, action) {

			const itemIndex = state.cartItems.findIndex(
					(item) => _.get(item, '[0]additionalInfo[0].genericTransactionTypeId', 1) === _.get(action, 'payload[0].additionalInfo[0].genericTransactionTypeId', 1)
			);

			console.log("existingIndex", itemIndex)


			if (state.cartItems[itemIndex].cartQuantity > 1) {
				state.cartItems[itemIndex].cartQuantity -= 1;


			} else if (state.cartItems[itemIndex].cartQuantity === 1) {
				const nextCartItems = state.cartItems.filter(
						(item) => _.get(item, '[0]additionalInfo[0].genericTransactionTypeId', 1) !== _.get(action, 'payload[0].additionalInfo[0].genericTransactionTypeId', 1)
				);

				state.cartItems = nextCartItems;

			}

			typeof window !== 'undefined' && localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart(state, action) {
			state.cartItems.map((cartItem) => {
				if (_.get(cartItem, '[0]additionalInfo[0].genericTransactionTypeId', 1) === _.get(action, 'payload[0].additionalInfo[0].genericTransactionTypeId', 1)) {
					console.log("shevida")
					const nextCartItems = state.cartItems.filter(
							(item) => _.get(item, '[0]additionalInfo[0].genericTransactionTypeId', 1) !== _.get(cartItem, '[0]additionalInfo[0].genericTransactionTypeId', 1)
					);
					console.log("nexttt", nextCartItems)
					state.cartItems = nextCartItems;
				}
				typeof window !== 'undefined' && localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
				return state;
			});
		},
		getTotals(state, action) {
			let {total, quantity} = state.cartItems.reduce(
					(cartTotal, cartItem) => {
						const price = _.get(cartItem, '[0]additionalInfo[0].servicePrice', 1)

						const cartQuantity = cartItem.cartQuantity;

						const itemTotal = price * cartQuantity;

						cartTotal.total += itemTotal;
						cartTotal.quantity += cartQuantity;

						return cartTotal;
					},
					{
						total: 0,
						quantity: 0,
					}
			);
			total = parseFloat(total.toFixed(2));
			state.cartTotalQuantity = quantity;
			state.cartTotalPrice = total;
		},
		clearCart(state, action) {
			state.cartItems = [];
			typeof window !== 'undefined' && localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
	},
});

export const {addToCart, decreaseCart, removeFromCart, getTotals, clearCart} =
		cartSlice.actions;

export default cartSlice.reducer;