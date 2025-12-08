import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{ WagmiConfig } from 'wagmi'
import { wagmiConfig } from './wagmiConfig.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </StrictMode>,
)
