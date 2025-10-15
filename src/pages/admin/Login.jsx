import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/Logo-custom-2.png";

const Login = () => {
  const loginAPI = "https://ismitourandtravel.com/api/auth/login";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login API:", loginAPI);
    try {
      const response = await axios.post(loginAPI, {
        username,
        password,
      });

      Cookies.set("token", response.data.data.token, { expires: 7 });
      navigate("/dashboard");
    } catch (error) {
      alert("Wrong Input");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-i-bright-blue">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text="Login"
          redirectTo={handleLogin}
          bgColor="i-bright-blue"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default Login;
