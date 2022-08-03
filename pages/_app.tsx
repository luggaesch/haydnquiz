import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {GameProvider} from "../contexts/GameContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
  )
}

export default MyApp
