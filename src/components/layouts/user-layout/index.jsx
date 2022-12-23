import Head from 'next/head'
import Header from "../../header";
import React from "react";
import Footer from "../../footer";
import {Provider} from "react-redux";
import store from "/src/components/store"
import {QueryClient,QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()
export default function Layout({children}){

	return (
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Head>
						<title>Layouts Example</title>
						<meta key="robots" name="robots" content="noindex,follow"/>
						<meta key="googlebot" name="googlebot" content="noindex,follow"/>
					</Head>
					<Header/>
					<main style={{
						flex:1
					}}>
						{children}
					</main>
					<Footer/>
				</Provider>
			</QueryClientProvider>
	)
}