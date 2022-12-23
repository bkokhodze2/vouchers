import {Provider} from 'react-redux';
import "../../styles/globals.css"
import "../../styles/font.css"
import 'animate.css';
// @ts-ignore
import cartReducer from "../components/slices/cartSlice";

import type {ReactElement, ReactNode} from 'react'
import React from "react";
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import store from "../components/store/index"
import Script from 'next/script'
import {QueryClient, QueryClientProvider} from 'react-query'
import Head from 'next/head'
import fav from "/public/images/images/fav.png"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const queryClient = new QueryClient()

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <meta key="robots" name="robots" content="noindex,follow"/>
          <meta key="googlebot" name="googlebot" content="noindex,follow"/>
          <link rel="icon"
                type="image/png"
                href={fav.src}/>
        </Head>
        <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(d, w, s) {
          var widgetHash = 'cRi3DgoS9KZnYMINwLA1', bch = d.createElement(s); bch.type = 'text/javascript'; bch.async = true;
          bch.src = '//widgets.binotel.com/chat/widgets/' + widgetHash + '.js';
          var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(bch, sn);
        })(document, window, 'script');`
        }}/>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </QueryClientProvider>
      </>
  )
}





