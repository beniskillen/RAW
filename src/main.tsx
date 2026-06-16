import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// NOTE: StrictMode intentionally omitted so the animation effects (Lenis,
// GSAP tickers, marquees) only initialise once.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
