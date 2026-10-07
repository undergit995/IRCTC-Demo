import { useState } from "react";

function AddTrain() {

  const [trainNumber, setTrainNumber] =
    useState("");

  const [name, setName] =
    useState("");

  const [source, setSource] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [departure, setDeparture] =
    useState("");

  const [arrival, setArrival] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [sl, setSl] =
    useState("");

  const [threeA, setThreeA] =
    useState("");

  const [twoA, setTwoA] =
    useState("");

  const [oneA, setOneA] =
    useState("");

  const [message, setMessage] =
    useState("");


  const addTrain = (e) => {

    e.preventDefault();

    if (
      !trainNumber ||
      !name ||
      !source ||
      !destination ||
      !departure ||
      !arrival
    ) {

      setMessage(
        "Please fill all required fields"
      );

      return;
    }


    const trains =
      JSON.parse(
        localStorage.getItem("trains")
      ) || [];


    const newTrain = {

      id: Date.now(),

      number: trainNumber,

      name,

      source,

      destination,

      departure,

      arrival,

      duration,

      classes: {
        SL: Number(sl) || 0,
        "3A": Number(threeA) || 0,
        "2A": Number(twoA) || 0,
        "1A": Number(oneA) || 0
      }

    };


    trains.push(newTrain);


    localStorage.setItem(
      "trains",
      JSON.stringify(trains)
    );


    setMessage(
      "Train added successfully"
    );


    setTrainNumber("");
    setName("");
    setSource("");
    setDestination("");
    setDeparture("");
    setArrival("");
    setDuration("");
    setSl("");
    setThreeA("");
    setTwoA("");
    setOneA("");
  };


  return (
    <div>

      <h1>
        Add Train Route
      </h1>


      {message && (
        <p className="success">
          {message}
        </p>
      )}


      <form
        className="form"
        onSubmit={addTrain}
      >

        <label>
          Train Number
        </label>

        <input
          value={trainNumber}
          onChange={(e) =>
            setTrainNumber(e.target.value)
          }
        />


        <label>
          Train Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <label>
          Source
        </label>

        <input
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        />


        <label>
          Destination
        </label>

        <input
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
        />


        <label>
          Departure
        </label>

        <input
          type="time"
          value={departure}
          onChange={(e) =>
            setDeparture(e.target.value)
          }
        />


        <label>
          Arrival
        </label>

        <input
          type="time"
          value={arrival}
          onChange={(e) =>
            setArrival(e.target.value)
          }
        />


        <label>
          Duration
        </label>

        <input
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          placeholder="12h 30m"
        />


        <h3>
          Seat Availability
        </h3>


        <label>
          Sleeper
        </label>

        <input
          type="number"
          value={sl}
          onChange={(e) =>
            setSl(e.target.value)
          }
        />


        <label>
          AC 3 Tier
        </label>

        <input
          type="number"
          value={threeA}
          onChange={(e) =>
            setThreeA(e.target.value)
          }
        />


        <label>
          AC 2 Tier
        </label>

        <input
          type="number"
          value={twoA}
          onChange={(e) =>
            setTwoA(e.target.value)
          }
        />


        <label>
          First AC
        </label>

        <input
          type="number"
          value={oneA}
          onChange={(e) =>
            setOneA(e.target.value)
          }
        />


        <button type="submit">
          Add Train
        </button>

      </form>

    </div>
  );
}

export default AddTrain;
