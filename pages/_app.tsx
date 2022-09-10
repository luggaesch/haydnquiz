import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {GameProvider} from "../contexts/GameContext";
import {SessionProvider} from "next-auth/react";
import {useEffect} from "react";

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {

    }, []);

  return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
          <GameProvider>
              <Component {...pageProps} />
          </GameProvider>
      </SessionProvider>
  )
}

export default MyApp;
