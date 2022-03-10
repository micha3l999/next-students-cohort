import "../styles/globals.css";
import "../styles/general.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
