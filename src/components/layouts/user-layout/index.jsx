import Head from 'next/head'
import Header from "../../header";
import React from "react";
import Footer from "../../footer";

export default function Layout({children}) {
	return (
			<>
				<Head>
					<title>Layouts Example</title>
				</Head>
				<Header/>
				<main>
					{children}
				</main>
				<Footer/>
			</>
	)
}