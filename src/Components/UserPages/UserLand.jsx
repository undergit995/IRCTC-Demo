import { Link, useNavigate } from "react-router-dom";

function UserLand() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>

      <nav className="navbar">

        <h2>IRCTC Booking</h2>

        <div>
          <Link to="/user">Home</Link>
          <Link to="/user/profile">Profile</Link>
          <Link to="/user/passengers">Passengers</Link>
          <Link to="/user/search">Search Trains</Link>
          <Link to="/user/bookings">My Bookings</Link>

          <button onClick={logout}>
            Logout
          </button>
        </div>

      </nav>


      <main className="user-home">

        <h1>
          Welcome, {user?.name}
        </h1>

        <p>
          Book your train journey quickly and easily.
        </p>


        <div className="home-cards">

          <Link
            to="/user/search"
            className="home-card"
          >
            <h2>Search Trains</h2>

            <p>
              Search trains between two stations.
            </p>
          </Link>


          <Link
            to="/user/passengers"
            className="home-card"
          >
            <h2>Passenger Master</h2>

            <p>
              Manage your saved passengers.
            </p>
          </Link>


          <Link
            to="/user/bookings"
            className="home-card"
          >
            <h2>My Bookings</h2>

            <p>
              View and cancel your bookings.
            </p>
          </Link>


          <Link
            to="/user/profile"
            className="home-card"
          >
            <h2>My Profile</h2>

            <p>
              View and update your profile.
            </p>
          </Link>

        </div>

      </main>

    </div>
  );
}

export default UserLand;
