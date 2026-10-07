import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Please fill all fields"
      );

      return;
    }


    if (password !== confirmPassword) {

      setError(
        "Passwords do not match"
      );

      return;
    }


    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];


    const emailExists =
      users.some(
        (user) =>
          user.email.toLowerCase() ===
          email.toLowerCase()
      );


    if (emailExists) {

      setError(
        "Email is already registered"
      );

      return;
    }


    const newUser = {

      id: Date.now(),

      name,

      email,

      password,

      role: "user"

    };


    users.push(newUser);


    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );


    navigate("/login");

  };


  return (
    <div className="auth-page">

      <div className="auth-box">

        <h2>
          Create Account
        </h2>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


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


          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />


          <button type="submit">
            Create Account
          </button>

        </form>


        <p>
          Already have an account?{" "}

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Signup;
