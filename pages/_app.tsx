import '../styles/globals.css'
import "antd/dist/antd.css"
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import {useEffect, useState} from "react";
import {Router} from "next/router";
import {Skeleton} from "antd";

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function start(event: any) {
            console.log(event);
            setLoading(true)
        }
        function end(event: any) {
            console.log(event);
            setLoading(false);
        }
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        }
    }, []);

  return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
          {loading ? <Skeleton active={true} /> :
              <Component {...pageProps} />
          }
      </SessionProvider>
  )
}

export default MyApp;
