import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap


// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';
import { AppProvider } from './components/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Home />
    </AppProvider>
  </React.StrictMode>,
)
