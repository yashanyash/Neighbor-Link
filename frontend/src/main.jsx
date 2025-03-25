import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import OfferService from './pages/OfferService.jsx'
import HelpRequest from './pages/HelpRequest.jsx'
import ServicesList from './pages/ServicesList.jsx'
import RequestsList from './pages/RequestsList.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "offer-service",
        element: <OfferService />
      },
      {
        path: "request-help",
        element: <HelpRequest />
      },
      {
        path: "services",
        element: <ServicesList />
      },
      {
        path: "requests",
        element: <RequestsList />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
