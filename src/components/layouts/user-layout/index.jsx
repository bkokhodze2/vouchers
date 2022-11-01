import Head from 'next/head'
import Header from "../../header";
import React from "react";
import Footer from "../../footer";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../../slices/cartSlice";
import store from "/src/components/store"


export default function Layout({children}) {
	return (
			<Provider store={store}>
				<Head>
					<title>Layouts Example</title>
				</Head>
				<Header/>
				<main>
					{children}
				</main>
				<Footer/>
			</Provider>
	)
}