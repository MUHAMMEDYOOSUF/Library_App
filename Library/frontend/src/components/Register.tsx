import axios from "axios";
import React, { useState } from "react";
import "./Register.css";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/v1/users", {
        username: username,
        password: password,
      });
      alert("Registration successful!");
      window.location.replace("/login");
      // Redirect to the login page
      // You can use the useHistory hook from react-router-dom to navigate to the login page
    } catch (error) {
      console.error(error);
      alert("Failed to register user");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="form-input"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-input"
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="form-input"
        />
      </label>
      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
}

export default Register;
