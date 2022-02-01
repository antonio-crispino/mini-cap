import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import NProgress from 'nprogress';
import Router from 'next/router';
import ContextProvider from "../context/context";
import ErrorCatcher from '../components/ErrorCatcher'
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CSSReset />
      <ContextProvider>
        <ErrorCatcher />
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
