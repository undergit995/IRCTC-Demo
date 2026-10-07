import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {

  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState(
      JSON.parse(
        localStorage.getItem("bookings")
      ) || []
    );


  const cancelBooking = (pnr) => {

    const updatedBookings =
      bookings.map((booking) => {

        if (booking.pnr === pnr) {

          return {
            ...booking,
            status: "Cancelled"
          };

        }

        return booking;
      });


    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );


    setBookings(updatedBookings);
  };


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

        <h1>
          My Bookings
        </h1>


        {bookings.length === 0 && (

          <p>
            You have no bookings.
          </p>

        )}


        {bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.pnr}
          >

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
                Date:
                {" "}
                {booking.journeyDate}
              </p>

              <p>
                PNR:
                {" "}
                <strong>
                  {booking.pnr}
                </strong>
              </p>

              <p>
                Class:
                {" "}
                {booking.class}
              </p>

              <p>
                Passengers:
                {" "}
                {booking.passengers.length}
              </p>

              <p>
                Fare:
                {" "}
                ₹{booking.fare}
              </p>

              <p>
                Status:
                {" "}
                <strong>
                  {booking.status}
                </strong>
              </p>

            </div>


            {booking.status === "Confirmed" && (

              <button
                onClick={() =>
                  cancelBooking(booking.pnr)
                }
              >
                Cancel Booking
              </button>

            )}

          </div>

        ))}

      </main>

    </div>
  );
}

export default MyBookings;