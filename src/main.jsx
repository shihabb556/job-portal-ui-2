import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <div className='bg-gradient-to-br from-[#141E30] to-[#243B55]  text-gray-100 min-h-screen'>
        <App />
        <Toaster />
      </div>
    </Provider>
  </>,
)