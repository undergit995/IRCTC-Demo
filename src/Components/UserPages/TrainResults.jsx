import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import trains from "../../utils/trainData";

function TrainResults() {
  const navigate = useNavigate();

  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  const [selectedClass, setSelectedClass] = useState("SL");

  const [quota, setQuota] = useState("General");

  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("trainSearch"));

    if (!savedSearch) {
      navigate("/user/search");
      return;
    }

    setSearch(savedSearch);

    const filtered = trains.filter((train) => {
      const sourceMatch =
        train.source.toLowerCase() === savedSearch.source.toLowerCase();

      const destinationMatch =
        train.destination.toLowerCase() ===
        savedSearch.destination.toLowerCase();

      return sourceMatch && destinationMatch;
    });

    setResults(filtered);
  }, [navigate]);

  const checkAvailability = (train) => {
    localStorage.setItem(
      "selectedTrain",
      JSON.stringify({
        train,
        class: selectedClass,
        quota,
        journeyDate: search.date,
      }),
    );

    navigate("/user/user-details");
  };

  return (
    <div>
      <nav className="navbar">
        <h2>IRCTC Booking</h2>

        <div>
          <button onClick={() => navigate("/user")}>Home</button>

          <button onClick={() => navigate("/user/search")}>New Search</button>

          <button onClick={() => navigate("/user/bookings")}>
            My Bookings
          </button>
        </div>
      </nav>

      <main className="page">
        <h1>Available Trains</h1>

        {search && (
          <div className="search-summary">
            <strong>{search.source}</strong>

            {" → "}

            <strong>{search.destination}</strong>

            <span>
              {" | "}
              {search.date}
            </span>
          </div>
        )}

        <div className="filter-box">
          <div>
            <label>Class</label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="SL">Sleeper (SL)</option>

              <option value="3A">AC 3 Tier (3A)</option>

              <option value="2A">AC 2 Tier (2A)</option>

              <option value="1A">First AC (1A)</option>
            </select>
          </div>

          <div>
            <label>Quota</label>

            <select value={quota} onChange={(e) => setQuota(e.target.value)}>
              <option value="General">General</option>

              <option value="Tatkal">Tatkal</option>

              <option value="Ladies">Ladies</option>
            </select>
          </div>
        </div>

        {results.length === 0 && (
          <div className="empty">No trains found for this route.</div>
        )}

        <div className="train-list">
          {results.map((train) => (
            <div className="train-card" key={train.id}>
              <div>
                <h2>{train.name}</h2>

                <p>Train No: {train.number}</p>
              </div>

              <div className="train-time">
                <div>
                  <strong>{train.departure}</strong>

                  <span>{train.source}</span>
                </div>

                <span>{train.duration}</span>

                <div>
                  <strong>{train.arrival}</strong>

                  <span>{train.destination}</span>
                </div>
              </div>

              <div>
                <p>Available Seats: {train.classes[selectedClass] || 0}</p>

                <p>Class: {selectedClass}</p>

                <p>Quota: {quota}</p>

                <button onClick={() => checkAvailability(train)}>
                  Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TrainResults;
