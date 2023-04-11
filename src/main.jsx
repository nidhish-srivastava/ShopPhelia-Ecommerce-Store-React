import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ArrayContextProvider } from './context/context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ArrayContextProvider>
        <App />
    </ArrayContextProvider>
)
