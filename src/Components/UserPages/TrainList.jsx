import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TrainList.css'

function Passengers() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [passengers, setPassengers] = useState(
    user?.passengers || []
  );

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [berth, setBerth] = useState("");


  const saveUser = (updatedPassengers) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex(
      (item) => item.id === user.id
    );

    if (index === -1) {
      return;
    }

    users[index].passengers =
      updatedPassengers;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(users[index])
    );

    setPassengers(updatedPassengers);
  };


  const addPassenger = (e) => {

    e.preventDefault();

    if (!name || !age || !gender) {
      return;
    }

    const passenger = {
      id: Date.now(),
      name,
      age,
      gender,
      berth
    };

    saveUser([
      ...passengers,
      passenger
    ]);

    setName("");
    setAge("");
    setGender("");
    setBerth("");
  };


  const deletePassenger = (id) => {

    const updatedPassengers =
      passengers.filter(
        (p) =>
          p.id !== id
      );

    saveUser(updatedPassengers);
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

        <h1>Passenger Master</h1>


        <form
          className="form"
          onSubmit={addPassenger}
        >

          <label>
            Passenger Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <label>
            Age
          </label>

          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
          />


          <label>
            Gender
          </label>

          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          <label>
            Berth Preference
          </label>

          <select
            value={berth}
            onChange={(e) =>
              setBerth(e.target.value)
            }
          >

            <option value="">
              No Preference
            </option>

            <option value="Lower">
              Lower
            </option>

            <option value="Middle">
              Middle
            </option>

            <option value="Upper">
              Upper
            </option>

            <option value="Side Lower">
              Side Lower
            </option>

            <option value="Side Upper">
              Side Upper
            </option>

          </select>


          <button type="submit">
            Add Passenger
          </button>

        </form>


        <div className="passenger-list">

          <h2>
            Saved Passengers
          </h2>


          {passengers.length === 0 && (
            <p>
              No passengers added yet.
            </p>
          )}


          {passengers.map((passenger) => (

            <div
              className="passenger-card"
              key={passenger.id}
            >

              <div>

                <h3>
                  {passenger.name}
                </h3>

                <p>
                  Age: {passenger.age}
                </p>

                <p>
                  Gender: {passenger.gender}
                </p>

                <p>
                  Berth:{" "}
                  {passenger.berth ||
                    "No Preference"}
                </p>

              </div>


              <button
                onClick={() =>
                  deletePassenger(passenger.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Passengers;