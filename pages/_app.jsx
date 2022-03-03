import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import NProgress from "nprogress";
import Router from "next/router";
import Fonts from "../components/Fonts";
import AppContextProvider from "../context/AppContext";
import ErrorCatcher from "../components/ErrorCatcher";
import "../styles/global.css";
import DataContextProvider from "../context/DataContext";

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
      <AppContextProvider>
        <DataContextProvider>
          <ErrorCatcher />
          <Component {...pageProps} />
        </DataContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
