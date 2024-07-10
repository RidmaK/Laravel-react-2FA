import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './router.tsx'
import { ContextProvider } from './contexts/ContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={route} />
    </ContextProvider>
  </React.StrictMode>,
)
