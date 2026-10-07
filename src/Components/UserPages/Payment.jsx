import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(localStorage.getItem("bookingData"));

    if (!data) {
      navigate("/user/search");
      return;
    }

    if (!data.journeyDate || !data.train) {
      navigate("/user/search");
      return;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const journeyDate = new Date(data.journeyDate);

    journeyDate.setHours(0, 0, 0, 0);

    if (journeyDate < today) {
      setError("This journey date has already passed. Please search again.");

      setLoading(false);

      return;
    }

    setBookingData(data);

    setLoading(false);
  }, [navigate]);

  const calculateAmount = () => {
    if (!bookingData) {
      return 0;
    }

    const passengers = bookingData.passengers?.length || 0;

    const prices = {
      SL: 500,
      "3A": 1000,
      "2A": 1500,
      "1A": 2000,
    };

    const price = prices[bookingData.class] || 500;

    return price * passengers;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    setError("");

    if (!bookingData) {
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      setError("Please enter your UPI ID.");

      return;
    }

    if (paymentMethod === "Card") {
      if (!cardNumber || !expiry || !cvv) {
        setError("Please enter all card details.");

        return;
      }
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const booking = {
      id: "PNR" + Date.now(),

      userId: user.id,

      train: bookingData.train,

      journeyDate: bookingData.journeyDate,

      class: bookingData.class,

      quota: bookingData.quota,

      passengers: bookingData.passengers,

      amount: calculateAmount(),

      paymentMethod,

      status: "Confirmed",

      bookedAt: new Date().toISOString(),
    };

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    localStorage.setItem("lastBooking", JSON.stringify(booking));

    localStorage.removeItem("bookingData");

    navigate("/user/confirmation");
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading payment...</h2>
      </div>
    );
  }

  if (error && !bookingData) {
    return (
      <div className="page">
        <div className="error">{error}</div>

        <button onClick={() => navigate("/user/search")}>Search Again</button>
      </div>
    );
  }

  if (!bookingData) {
    return null;
  }

  return (
    <div>
      <nav className="navbar">
        <h2>IRCTC Booking</h2>

        <div>
          <button onClick={() => navigate("/user")}>Home</button>

          <button onClick={() => navigate("/user/bookings")}>
            My Bookings
          </button>
        </div>
      </nav>

      <main className="page">
        <h1>Payment</h1>

        <div className="booking-summary">
          <h2>{bookingData.train.name}</h2>

          <p>Train No: {bookingData.train.number}</p>

          <p>
            {bookingData.train.source}
            {" → "}
            {bookingData.train.destination}
          </p>

          <p>Date: {bookingData.journeyDate}</p>

          <p>Class: {bookingData.class}</p>

          <p>Quota: {bookingData.quota}</p>

          <p>Passengers: {bookingData.passengers.length}</p>
        </div>

        <div className="payment-box">
          <h2>Payment Details</h2>

          <div className="payment-methods">
            <button
              type="button"
              className={paymentMethod === "UPI" ? "active" : ""}
              onClick={() => setPaymentMethod("UPI")}
            >
              UPI
            </button>

            <button
              type="button"
              className={paymentMethod === "Card" ? "active" : ""}
              onClick={() => setPaymentMethod("Card")}
            >
              Debit / Credit Card
            </button>
          </div>

          {paymentMethod === "UPI" && (
            <div>
              <label>UPI ID</label>

              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === "Card" && (
            <div>
              <label>Card Number</label>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />

              <label>Expiry</label>

              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />

              <label>CVV</label>

              <input
                type="password"
                placeholder="CVV"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <div className="payment-total">
            <h2>Total Amount: ₹{calculateAmount()}</h2>
          </div>

          <button className="continue-button" onClick={handlePayment}>
            Pay ₹{calculateAmount()}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Payment;
