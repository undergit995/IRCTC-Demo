import { useNavigate } from "react-router-dom";

function BookingConfirmation() {

  const navigate = useNavigate();

  const booking = JSON.parse(
    localStorage.getItem("lastBooking")
  );


  if (!booking) {

    return (

      <div className="page">

        <h2>
          No booking found
        </h2>

        <button
          onClick={() =>
            navigate("/user")
          }
        >
          Go Home
        </button>

      </div>

    );
  }


  return (
    <div>

      <nav className="navbar">

        <h2>IRCTC Booking</h2>

        <button
          onClick={() =>
            navigate("/user")
          }
        >
          Home
        </button>

      </nav>


      <main className="page">

        <div className="confirmation">

          <h1>
            Booking Confirmed
          </h1>

          <h2>
            PNR:
            {" "}
            {booking.pnr}
          </h2>


          <div>

            <h2>
              {booking.train.name}
            </h2>

            <p>
              Train No:
              {" "}
              {booking.train.number}
            </p>

            <p>
              {booking.train.source}
              {" → "}
              {booking.train.destination}
            </p>

            <p>
              Journey Date:
              {" "}
              {booking.journeyDate}
            </p>

            <p>
              Class:
              {" "}
              {booking.class}
            </p>

            <p>
              Quota:
              {" "}
              {booking.quota}
            </p>

          </div>


          <h3>
            Passengers
          </h3>

          {booking.passengers.map(
            (passenger) => (

              <div
                className="passenger-card"
                key={passenger.id}
              >

                <p>
                  <strong>
                    {passenger.name}
                  </strong>
                </p>

                <p>
                  Age: {passenger.age}
                </p>

                <p>
                  Gender: {passenger.gender}
                </p>

                <p>
                  Berth:
                  {" "}
                  {passenger.berth ||
                    "No Preference"}
                </p>

              </div>

            )
          )}


          <h2>
            Total Fare: ₹{booking.fare}
          </h2>


          <button
            onClick={() =>
              navigate("/user/bookings")
            }
          >
            View My Bookings
          </button>


          <button
            onClick={() =>
              navigate("/user/search")
            }
          >
            Book Another Ticket
          </button>

        </div>

      </main>

    </div>
  );
}

export default BookingConfirmation;