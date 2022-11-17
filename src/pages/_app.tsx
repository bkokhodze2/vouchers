import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import "../../styles/globals.css"
import {configureStore} from "@reduxjs/toolkit";
// @ts-ignore
import cartReducer from "../components/slices/cartSlice";

import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import store from "../components/store/index"
import Script from 'next/script'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
      <>
        <Script dangerouslySetInnerHTML={{
          __html: `(function(d, w, s) {
                var widgetHash = '6RbjV9Nq9riHUTrKPbFJ', bch = d.createElement(s); bch.type = 'text/javascript'; bch.async = true;
                bch.src = '//widgets.binotel.com/chat/widgets/' + widgetHash + '.js';
                var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(bch, sn);
              })(document, window, 'script');`
        }}/>

        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
  )
}





