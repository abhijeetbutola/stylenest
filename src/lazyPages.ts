import { lazy } from "react";

export const ProductSpec = lazy(
  () => import("./components/product-specification")
);
export const ProductDetailsPage = lazy(
  () => import("./pages/product-details-page")
);
export const Cart = lazy(() => import("./pages/shopping-cart"));
export const Checkout = lazy(() => import("./pages/checkout"));
export const OrderSuccessPage = lazy(
  () => import("./pages/order-success-page")
);
export const ProductListingPage = lazy(
  () => import("./pages/product-listing-page")
);
export const LatestArrivalsPage = lazy(
  () => import("./pages/latest-arrivals-page")
);
export const SignIn = lazy(() => import("./pages/sign-in"));
export const SignUp = lazy(() => import("./pages/sign-up"));
