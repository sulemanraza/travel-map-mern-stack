import "./Login.css";
import { useState } from "react";
import { GrMap } from "react-icons/gr";
import axios from "axios";

export default function Login({ localStorage, setShowLogin, setCurrentUser }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  //   data
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
        user
      );
      setSuccess(true);
      const { username } = response?.data;
      setCurrentUser(username);
      localStorage.setItem("user", username);
      setShowLogin(null);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="LoginContainer">
      <div className="wrap">
        <div className="overly"></div>
        <h2>
          <GrMap />
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit LoginBtn">Login</button>
        </form>
        <button className="closeBtn" onClick={() => setShowLogin(null)}>
          X
        </button>
        {success && (
          <div className="success">Successfully. You can Login Now!</div>
        )}
        {error && <div className="error">Some want Wrong!</div>}
      </div>
    </div>
  );
}
