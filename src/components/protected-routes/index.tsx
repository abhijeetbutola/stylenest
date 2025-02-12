import { useAppSelector } from "../../hooks";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(
    (state) => state.auths.isAuthenticated
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
