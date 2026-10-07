import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserMaster() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("currentUser")
    );

  const [passengers, setPassengers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [berth, setBerth] = useState("No Preference");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    const allPassengers =
      JSON.parse(
        localStorage.getItem("passengers")
      ) || [];

    const userPassengers =
      allPassengers.filter(
        (passenger) =>
          passenger.userId === user.id
      );

    setPassengers(userPassengers);

  }, [navigate, user?.id]);


  const savePassengers = (updatedPassengers) => {

    const allPassengers =
      JSON.parse(
        localStorage.getItem("passengers")
      ) || [];

    const otherPassengers =
      allPassengers.filter(
        (passenger) =>
          passenger.userId !== user.id
      );

    const finalPassengers = [
      ...otherPassengers,
      ...updatedPassengers
    ];

    localStorage.setItem(
      "passengers",
      JSON.stringify(finalPassengers)
    );

    setPassengers(updatedPassengers);
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("Please enter passenger name");
      return;
    }

    if (!age) {
      setError("Please enter passenger age");
      return;
    }

    if (Number(age) < 1 || Number(age) > 120) {
      setError("Please enter a valid age");
      return;
    }


    if (editingId) {

      const updatedPassengers =
        passengers.map((passenger) => {

          if (passenger.id !== editingId) {
            return passenger;
          }

          return {
            ...passenger,
            name: name.trim(),
            age: Number(age),
            gender,
            berth
          };

        });

      savePassengers(updatedPassengers);

      setMessage(
        "Passenger updated successfully"
      );

    } else {

      const newPassenger = {

        id: Date.now(),

        userId: user.id,

        name: name.trim(),

        age: Number(age),

        gender,

        berth

      };

      savePassengers([
        ...passengers,
        newPassenger
      ]);

      setMessage(
        "Passenger added successfully"
      );
    }


    resetForm();
  };


  const resetForm = () => {

    setName("");
    setAge("");
    setGender("Male");
    setBerth("No Preference");
    setEditingId(null);
  };


  const editPassenger = (passenger) => {

    setName(passenger.name);
    setAge(passenger.age);
    setGender(passenger.gender);
    setBerth(passenger.berth);
    setEditingId(passenger.id);

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const deletePassenger = (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this passenger?"
      );

    if (!confirmed) {
      return;
    }

    const updatedPassengers =
      passengers.filter(
        (passenger) =>
          passenger.id !== id
      );

    savePassengers(updatedPassengers);

    setMessage(
      "Passenger deleted successfully"
    );
  };


  return (
    <div>

      <nav className="navbar">

        <h2>
          IRCTC Booking
        </h2>

        <div>

          <button
            onClick={() =>
              navigate("/user")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              navigate("/user/search")
            }
          >
            Search Trains
          </button>

          <button
            onClick={() =>
              navigate("/user/bookings")
            }
          >
            My Bookings
          </button>

        </div>

      </nav>


      <main className="page">

        <h1>
          Passenger Master
        </h1>

        <p>
          Save passenger details for faster
          ticket booking.
        </p>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        {message && (
          <p className="success">
            {message}
          </p>
        )}


        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingId
              ? "Edit Passenger"
              : "Add Passenger"}
          </h2>


          <label>
            Passenger Name
          </label>

          <input
            type="text"
            value={name}
            placeholder="Enter full name"
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <label>
            Age
          </label>

          <input
            type="number"
            min="1"
            max="120"
            value={age}
            placeholder="Enter age"
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

            <option value="No Preference">
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

            {editingId
              ? "Update Passenger"
              : "Add Passenger"}

          </button>


          {editingId && (

            <button
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>

          )}

        </form>


        <div className="passenger-list">

          <h2>
            Saved Passengers
          </h2>


          {passengers.length === 0 && (

            <div className="empty">

              <p>
                No passengers saved yet.
              </p>

              <p>
                Add a passenger above to
                create your Passenger Master.
              </p>

            </div>

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
                  Berth: {passenger.berth}
                </p>

              </div>


              <div>

                <button
                  onClick={() =>
                    editPassenger(passenger)
                  }
                >
                  Edit
                </button>


                <button
                  onClick={() =>
                    deletePassenger(
                      passenger.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default UserMaster;