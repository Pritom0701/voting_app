import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home.jsx'
import Result from './Pages/Result.jsx'
import Registration_voter from './Pages/Registration_voter.jsx'
import Registration_candidate from './Pages/Registration_candidate.jsx'
import { Toaster } from 'react-hot-toast';
// import Layout from './Layout/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/result",
    element: <Result />
  },
  {
    path: "/voter-registration",
    element: <Registration_voter />
  },
  {
    path: "/candidate-registration",
    element: <Registration_candidate />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
