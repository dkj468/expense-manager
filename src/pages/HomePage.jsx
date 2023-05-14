import { Navigate } from "react-router-dom";
import Home from "../component/Home";
import { useAuthContext } from "../store/authContext";
const HomePage = () => {
  const { IsLoggedIn } = useAuthContext();

  if (IsLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
};

export default HomePage;
