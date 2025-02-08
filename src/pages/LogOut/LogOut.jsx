import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/fetchAPI";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();    
      navigate("/");
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout;
