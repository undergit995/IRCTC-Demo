import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [name, setName] = useState(
    user?.name || ""
  );

  const [phone, setPhone] = useState(
    user?.phone || ""
  );

  const [email] = useState(
    user?.email || ""
  );

  const [message, setMessage] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex(
      (item) => item.id === user.id
    );

    if (index === -1) {
      return;
    }

    users[index].name = name;
    users[index].phone = phone;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(users[index])
    );

    setMessage("Profile updated successfully.");
  };


  return (
    <div>

      <nav className="navbar">

        <h2>IRCTC Booking</h2>

        <div>
          <button
            onClick={() => navigate("/user")}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/user/profile")}
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/user/passengers")}
          >
            Passengers
          </button>

          <button
            onClick={() => navigate("/user/search")}
          >
            Search Trains
          </button>

          <button
            onClick={() => navigate("/user/bookings")}
          >
            My Bookings
          </button>

        </div>

      </nav>


      <main className="page">

        <h1>My Profile</h1>

        {message && (
          <p className="success">
            {message}
          </p>
        )}


        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <label>
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            disabled
          />


          <label>
            Mobile Number
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />


          <button type="submit">
            Save Changes
          </button>

        </form>

      </main>

    </div>
  );
}

export default UserProfile;