import { useEffect } from 'react';

import '../styles/globals.css'

import { GlobalContext } from 'state/context/globalContext';
import NavBar from 'template/NavBar';

function MyApp({ Component, pageProps }) {

  return (
    <GlobalContext>
      <Component {...pageProps} />
    </GlobalContext>)
}

export default MyApp
