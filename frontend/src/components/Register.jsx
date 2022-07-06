import "./Register.css";
import { useState } from "react";
import { GrMap } from "react-icons/gr";
import axios from "axios";

export default function Register({
  localStorage,
  setShowRegister,
  setCurrentUser,
}) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  //   data
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
        user
      );
      setSuccess(true);
      const { username } = response?.data.user;
      localStorage.setItem("user", username);
      setCurrentUser(username);
      setShowRegister(null);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="RegisterContainer">
      <div className="wrap">
        <div className="overly"></div>
        <h2>
          <GrMap />
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Username"
            min={3}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
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
          <button type="submit RegisterBtn">Register</button>
        </form>
        <button className="closeBtn" onClick={() => setShowRegister(null)}>
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
