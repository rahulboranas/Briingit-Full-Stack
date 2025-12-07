import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("accesstoken", token);
      navigate("/");
    }
  }, [token]);

  return <p>Logging you in with Google...</p>;
};

export default LoginSuccess;
