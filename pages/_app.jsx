import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import NProgress from "nprogress";
import Router from "next/router";
import Fonts from "../components/Fonts";
import ContextProvider from "../context/context";
import ErrorCatcher from "../components/ErrorCatcher";
import "../styles/global.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// setting up global font for heading and body
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "opensans-regular",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <CSSReset />
      <ContextProvider>
        <ErrorCatcher />
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
