import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const navigate = useNavigate();

  const [selectedTrain, setSelectedTrain] = useState(null);

  const [passengers, setPassengers] = useState([]);

  const [selectedPassengers, setSelectedPassengers] = useState([]);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const train = JSON.parse(localStorage.getItem("selectedTrain"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (!train) {
      navigate("/user/search");
      return;
    }

    const journeyDate = train.journeyDate;

    if (!journeyDate) {
      setError("Journey date is missing. Please search for a train again.");

      return;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(journeyDate);

    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError(
        "This journey date has already passed. Please select a future date.",
      );

      return;
    }

    setSelectedTrain(train);

    const allPassengers = JSON.parse(localStorage.getItem("passengers")) || [];

    const userPassengers = allPassengers.filter(
      (passenger) => String(passenger.userId) === String(user.id),
    );

    setPassengers(userPassengers);
  }, [navigate]);

  const togglePassenger = (id) => {
    setSelectedPassengers((current) => {
      if (current.includes(id)) {
        return current.filter((passengerId) => passengerId !== id);
      }

      return [...current, id];
    });
  };

  const continueBooking = () => {
    setError("");
    setMessage("");

    if (!selectedTrain) {
      setError("Train information is missing.");
      return;
    }

    const journeyDate = selectedTrain.journeyDate;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(journeyDate);

    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError(
        "This journey date has already passed. Please search again with a future date.",
      );

      return;
    }

    if (selectedPassengers.length === 0) {
      setError("Please select at least one passenger.");

      return;
    }

    const bookingPassengers = passengers.filter((passenger) =>
      selectedPassengers.includes(passenger.id),
    );

    const bookingData = {
      train: selectedTrain.train,

      class: selectedTrain.class,

      quota: selectedTrain.quota,

      journeyDate: selectedTrain.journeyDate,

      passengers: bookingPassengers,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    navigate("/user/payment");
  };

  if (!selectedTrain && !error) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar">
        <h2>IRCTC Booking</h2>

        <div>
          <button onClick={() => navigate("/user")}>Home</button>

          <button onClick={() => navigate("/user/passengers")}>
            Passenger Master
          </button>

          <button onClick={() => navigate("/user/bookings")}>
            My Bookings
          </button>
        </div>
      </nav>

      <main className="page">
        <h1>Passenger Details</h1>

        {error && (
          <div className="error">
            {error}

            <br />

            <button
              className="continue-button"
              onClick={() => navigate("/user/search")}
            >
              Search Again
            </button>
          </div>
        )}

        {selectedTrain && (
          <>
            <div className="booking-summary">
              <h2>{selectedTrain.train.name}</h2>

              <p>Train No: {selectedTrain.train.number}</p>

              <p>
                {selectedTrain.train.source}
                {" → "}
                {selectedTrain.train.destination}
              </p>

              <p>Date: {selectedTrain.journeyDate}</p>

              <p>Class: {selectedTrain.class}</p>

              <p>Quota: {selectedTrain.quota}</p>
            </div>

            {passengers.length === 0 && (
              <div className="empty">
                <h3>No passengers found.</h3>

                <p>
                  Add passengers to your Passenger Master before continuing with
                  the booking.
                </p>

                <button
                  className="continue-button"
                  onClick={() => navigate("/user/passengers")}
                >
                  Add Passenger
                </button>
              </div>
            )}

            {passengers.length > 0 && (
              <div className="passenger-list">
                <h2>Select Passengers</h2>

                {passengers.map((passenger) => (
                  <div
                    className={
                      selectedPassengers.includes(passenger.id)
                        ? "passenger-card selected"
                        : "passenger-card"
                    }
                    key={passenger.id}
                  >
                    <div>
                      <h3>{passenger.name}</h3>

                      <p>Age: {passenger.age}</p>

                      <p>Gender: {passenger.gender}</p>

                      <p>Berth Preference: {passenger.berth}</p>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        checked={selectedPassengers.includes(passenger.id)}
                        onChange={() => togglePassenger(passenger.id)}
                      />

                      <label>Select</label>
                    </div>
                  </div>
                ))}

                <button className="continue-button" onClick={continueBooking}>
                  Continue to Payment
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default UserDetails;
