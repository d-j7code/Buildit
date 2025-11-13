import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LingoProviderWrapper, loadDictionary } from "lingo.dev/react/client"
import { ConvexProvider } from "convex/react"
import convex from "./convex.js"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <LingoProviderWrapper loadDictionary={(locale) => loadDictionary(locale)}>
        <App />
      </LingoProviderWrapper>
    </ConvexProvider>
  </StrictMode>,
)
