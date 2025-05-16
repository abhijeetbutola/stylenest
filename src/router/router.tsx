import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landing-page";
import NotFoundPage from "../pages/not-found-page";
import ProtectedRoutes from "../components/protected-routes";
import AppWrapper from "./AppWrapper";

import {
  Cart,
  Checkout,
  SignIn,
  SignUp,
  LatestArrivalsPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProductListingPage,
  ProductSpec,
} from "../lazyPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />, // wraps App + Suspense
    children: [
      { index: true, element: <LandingPage /> },
      { path: "product-specification", element: <ProductSpec /> },
      {
        path: "product-details-page/:productId",
        element: <ProductDetailsPage />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "order-success-page",
        element: (
          <ProtectedRoutes>
            <OrderSuccessPage />
          </ProtectedRoutes>
        ),
      },
      { path: "product-listing-page", element: <ProductListingPage /> },
      { path: "latest-arrivals-page", element: <LatestArrivalsPage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
