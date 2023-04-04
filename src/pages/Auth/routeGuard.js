import { Navigate } from "react-router-dom";
import { isAuthenticated, isAuthorized } from "./authCheck";

const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  const authorized = isAuthorized();

  return authenticated ? (
    authorized ? (
      children
    ) : (
      <Navigate to="/pageNotFound" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
