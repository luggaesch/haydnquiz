import '../styles/globals.css'
import "antd/dist/antd.css"
import {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import {useEffect, useState} from "react";
import {Router} from "next/router";
import {Spin} from "antd";
import {motion} from 'framer-motion';
import {LoadingOutlined} from "@ant-design/icons";

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function start() {
            setLoading(true)
        }
        function end() {
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
          {loading ?
              <motion.div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
                          animate={{ color: ["rgb(0,255,139)", "rgb(0,128,255)", "rgb(255, 0, 89)" , "rgb(0,255,139)"] }}
                          transition={{ repeatType: "reverse", repeat: Infinity, ease: "easeInOut", duration: 2.5, times: [0, 0.5, 1.5, 2.5] }}
              >
                  <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "12rem", color: "inherit" }} spin />}  />
              </motion.div>
              :
              <Component {...pageProps} />
          }
      </SessionProvider>
  )
}

export default MyApp;
