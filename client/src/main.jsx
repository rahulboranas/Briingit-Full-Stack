// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import router from './route/index.jsx'
// import {Provider} from 'react-redux'
// import {store} from './store/store.js' 
// createRoot(document.getElementById('root')).render(
// <Provider store={store}>
//       <RouterProvider router={router}/>
// </Provider>
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import router from './route/index.jsx'
import App from './App.jsx'
import './index.css'

// 👇 Import GoogleOAuthProvider
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
)