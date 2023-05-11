import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Register.css";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsLoggedIn }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Fetch user data from the API
    try {
      const response = await axios.get("http://localhost:4000/api/v1/users");
      const users = response.data;
      // Check if entered credentials match with any user
      const matchingUser = users.find(
        (user: any) => user.username === username && user.password === password
      );
      if (matchingUser) {
        // Store user details in cookies
        Cookies.set("userId", matchingUser.id);
        // Log in the user and redirect to /books
        console.log("hdhdhdh");
        setIsLoggedIn(true);
        window.location.replace("/");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="register-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
      />
      <button type="submit" onClick={handleLogin} className="form-button">
        Login
      </button>
    </div>
  );
}

export default Login;
