import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductSpec from "../components/product-specification";
import Collections from "../pages/collections";
import ProductDetailsPage from "../pages/product-details-page";
import Cart from "../pages/shopping-cart";
import Checkout from "../pages/checkout";
import LandingPage from "../pages/landing-page";
import ProductListingPage from "../pages/product-listing-page";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import NotFoundPage from "../pages/not-found-page";
import ProtectedRoutes from "../components/protected-routes";
import LatestArrivalsPage from "../pages/latest-arrivals-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "product-specification",
        element: <ProductSpec />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "product-details-page/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "product-listing-page",
        element: <ProductListingPage />,
      },
      {
        path: "latest-arrivals-page",
        element: <LatestArrivalsPage />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
