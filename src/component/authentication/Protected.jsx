import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";

const Protected = ({ children }) => {
  console.log("inside Protected - " + new Date());

  const { IsLoggedIn } = useAuthContext();

  if (!IsLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
