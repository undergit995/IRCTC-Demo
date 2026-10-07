import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchTrains.css'

function SearchTrains() {

  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const today = new Date();

today.setHours(0, 0, 0, 0);

const selectedDate = new Date(date);

selectedDate.setHours(0, 0, 0, 0);

if (selectedDate < today) {
  setError(
    "You can't book a train for a date that has already passed."
  );

  return;
}
const handleSearch = (e) => {

  e.preventDefault();

  setError("");

  if (!source || !destination || !date) {

    setError(
      "Please fill all search details."
    );

    return;
  }


  const today = new Date();

  today.setHours(0, 0, 0, 0);


  const selectedDate =
    new Date(date);

  selectedDate.setHours(0, 0, 0, 0);


  if (selectedDate < today) {

    setError(
      "You cannot book a train for a date that has already passed."
    );

    return;
  }


  if (
    source.toLowerCase() ===
    destination.toLowerCase()
  ) {

    setError(
      "Source and destination cannot be the same."
    );

    return;
  }


  localStorage.setItem(
    "trainSearch",
    JSON.stringify({
      source,
      destination,
      date
    })
  );


  navigate("/user/trains");
};


  return (
    <div>

      <nav className="navbar">

        <h2>IRCTC Booking</h2>

        <div>
          <button onClick={() => navigate("/user")}>
            Home
          </button>

          <button onClick={() => navigate("/user/profile")}>
            Profile
          </button>

          <button onClick={() => navigate("/user/passengers")}>
            Passengers
          </button>

          <button onClick={() => navigate("/user/bookings")}>
            My Bookings
          </button>
        </div>

      </nav>


      <main className="page">

        <h1>Search Trains</h1>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <form
          className="search-form"
          onSubmit={handleSearch}
        >

          <div>
            <label>From</label>

            <input
              type="text"
              placeholder="Source station"
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
            />
          </div>


          <div>
            <label>To</label>

            <input
              type="text"
              placeholder="Destination station"
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
            />
          </div>


          <div>
            <label>Journey Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>


          <button type="submit">
            Search Trains
          </button>

        </form>

      </main>

    </div>
  );
}

export default SearchTrains;