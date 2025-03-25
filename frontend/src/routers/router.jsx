import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import HelpRequest from "../pages/HelpRequest";
import OfferService from "../pages/OfferService";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children :[
        {
            path: "/",
            element:<h1>HOME</h1>,
        },
        {
            path: "/orders",
            element:<div>orders</div>,
        },
        {
            path: "/about",
            element:<div>about</div>,
        },
        {
          path: "/help",
          element:<HelpRequest/>,
      },
      {
        path: "/off",
        element:<OfferService/>,
    },
    {
      path: "/help",
      element:<HelpRequest/>,
  }
      ]
    },
  ]);

  export default router;