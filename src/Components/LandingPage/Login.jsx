import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }


    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      const admin = {
        id: "admin",
        name: "Administrator",
        email: "admin@gmail.com",
        role: "admin"
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(admin)
      );

      navigate("/admn");

      return;
    }


    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];


    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password &&
        item.role === "user"
    );


    if (!user) {

      setError(
        "Invalid email or password"
      );

      return;
    }


    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );


    navigate("/user");
  };


  return (
    <div className="auth-page">

      <div className="auth-box">

        <h2>
          IRCTC Login
        </h2>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button type="submit">
            Login
          </button>

        </form>


        <p>
          Don't have an account?{" "}

          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;