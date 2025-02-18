import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

// const CLIENT_URL = "http://172.25.15.100:3000";
const CLIENT_URL = "https://api.superworks.net:3101";
const CLIENT_ID = "bfVwBCVJDdIRZ1oMBT-vr-qV";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialized = useRef(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    // Skip if already initialized
    if (initialized.current) return;
    initialized.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const codeParams = urlParams.get("code");
    const stateParams = urlParams.get("state");

    if (codeParams && stateParams) {
      const url = `${CLIENT_URL}/oauth2/token`;

      const data = {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code: codeParams,
        code_verifier: localStorage.getItem("code_verifier"),
      };
      localStorage.removeItem("code_challenge");
      localStorage.removeItem("code_verifier");
      localStorage.removeItem("state");
      
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          document.cookie = `auth_token=${data.access_token}; path=/`;
          navigate('/dashboard', { replace: true });
        //   navigate(location.pathname, { replace: true });
        })
        .catch((error) => {
          window.location.href =
            window.location.origin + window.location.pathname;
          console.error("Error:", error);
        });
    } else {
      let { state, code_challenge, code_verifier } = getCredentials();
      console.log("state:::", state);
      console.log("code_challenge:::", code_challenge);
      console.log("code_verifier:::", code_verifier);
      
      localStorage.setItem("state", state);
      localStorage.setItem("code_challenge", code_challenge);
      localStorage.setItem("code_verifier", code_verifier);
      
      const url = `${CLIENT_URL}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${window.location.href}&scope=email&state=${state}&code_challenge=${code_challenge}&code_challenge_method=S256`;

      document.getElementById("myLink").href = url;
    }
  }, [navigate]);

  return (
    <div className="sign-in-content">
      <h4>Sign in to</h4>
      <h1>Terminal Operating System</h1>

      <form className="sign-in-form">
        <div className="input-group">
          <input type="email" placeholder="Email" />
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button type="button" className="get-started-btn">
          Login
        </button>
      </form>

      <div className="social-sign-in">
        <p>Or sign in with</p>
        <div className="social-btn">
          <a href="#" id="myLink">
            <img src={`${import.meta.env.BASE_URL}assets/superworks.png`} alt="Superworks" />
            Login with Superworks
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
