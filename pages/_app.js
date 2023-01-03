import { StrictMode } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    // <StrictMode>
      <Component {...pageProps} />
  // </StrictMode>
  )
}
