// src/router/AppWrapper.jsx
import { Suspense } from "react";
import App from "../App";

const LoadingFallback = () => <div className="text-center p-4">Loading…</div>;

export default function AppWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  );
}
