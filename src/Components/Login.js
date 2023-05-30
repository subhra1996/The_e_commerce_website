import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:4200/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });

    result = await result.json();
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        value={password}
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
