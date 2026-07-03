import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { loginAsGuest } from "../store/suggestions-thunks";

import classes from "./LoginPage.module.css";
import changeRootStyle from "../utils/changeRootStyle";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const handleGuestLogin = async () => {
    setIsLoggingIn(true);
    setError("");
    try {
      await dispatch(loginAsGuest()).unwrap();
      changeRootStyle("sug");
      navigate("/", { replace: true });
    } catch (err) {
      setError("Failed to login as guest. Please try again.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginCard}>
        <h1 className={classes.title}>Product Feedback</h1>
        <p className={classes.subtitle}>
          Discover, suggest, and track features that will shape the future of our product.
        </p>
        
        <button 
          className={classes.guestBtn} 
          onClick={handleGuestLogin}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <div className={classes.loader} /> : "Start as Guest"}
        </button>
        
        {error && <p style={{ color: '#ffb3b3', marginTop: '1.5rem', fontSize: '1.3rem' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
