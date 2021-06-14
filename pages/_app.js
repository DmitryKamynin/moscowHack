import '../styles/globals.css'

import { GlobalContext } from 'state/context/globalContext';
import { YMaps } from 'react-yandex-maps';

function MyApp({ Component, pageProps }) {

  return (
    <GlobalContext>
      <YMaps
        query={{
          apikey: '60bf95b0-8158-4371-9afb-5758ea191f34',
        }}
      >
        <Component {...pageProps} />
      </YMaps>
    </GlobalContext>)
}

export default MyApp
