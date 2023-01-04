import Head from 'next/head'
import Header from "../../../../components/admin/header";
import React from "react";
import {useRouter} from "next/router";

export default function Layout({children}){
	const baseApi = process.env.baseApi;
	const Router = useRouter();

	return (
			<>
				<Head>
					<title>Layouts Example</title>
				</Head>
				<Header/>

				<main>
					{children}
				</main>
			</>
	)
}