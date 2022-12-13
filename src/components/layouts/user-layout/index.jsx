import Head from 'next/head'
import Header from "../../header";
import React from "react";
import Footer from "../../footer";
import {Provider} from "react-redux";
import store from "/src/components/store"
import {QueryClient,QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()
export default function Layout({children}){

	// axios.interceptors.request.use((config) => {
	// 	config.headers = {
	// 		...config.headers,
	//
	// 		'Access-Control-Allow-Origin':'*',
	// 		'Content-Type':'application/json',
	//
	// 		Authorization:`Bearer
	// eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NzA5NTQwOTAsImlhdCI6MTY3MDkxODEwOSwiYXV0aF90aW1lIjoxNjcwOTE4MDkwLCJqdGkiOiJmMTlkMzliNi04NjQ2LTQ1ODItYmJjMS00ZGFkZmUyMGE5YjQiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5nZS9yZWFsbXMveHJhY29vbi1kZW1vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQ0ZGFiZTg2LTE1OWEtNDg1NC1hMzc1LTcxZjFiYzViMjlhMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNzLWNhcnQiLCJzZXNzaW9uX3N0YXRlIjoiMDVjYjAzMTYtMjZiMC00NDljLWFiZmQtNzM3MTA3OTU5NmI3IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXhyYWNvb24tZGVtbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiIwNWNiMDMxNi0yNmIwLTQ0OWMtYWJmZC03MzcxMDc5NTk2YjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiJkNGRhYmU4Ni0xNTlhLTQ4NTQtYTM3NS03MWYxYmM1YjI5YTEiLCJuYW1lIjoia29tZXRhIGtvbWV0YSIsInByZWZlcnJlZF91c2VybmFtZSI6ImtvbWV0YUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoia29tZXRhIiwiZmFtaWx5X25hbWUiOiJrb21ldGEiLCJlbWFpbCI6ImtvbWV0YUBnbWFpbC5jb20ifQ.etXAw-LEDY9OdodK8VPa4A5WD7tb7gQclXCZeoWtqafiX_keWZyMQpj3J95mFf4Wa8Ruise6nUe8oIFYmi-dOUoq_-rWxM0NxPHjM8-Wdn37PpLrr3Dy4yEIHf46H6xettg9zRDMDG_CqE4eq1Qevbo01RBItq3jtgTDYNTVo6OtyKmJ3c-b9HWlKLVwdDebqYcrQGU0GgimIMWIm2ukFatB6IPi7ZWvFm15VYqX7dxle47L39t9gtND2dPluyYgPo4JczcCuS6u4_O7RnehXleBQVl0EUQaRvlHgyrM2Rg4DvpXqZiax2T7EWuaH7Px4q2dB-gD_OT0JhSwDCuwFQ`
	//  };  return config; });

	return (
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Head>
						<title>Layouts Example</title>
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