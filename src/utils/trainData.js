const trains = [
  {
    id: 1,
    number: "12723",
    name: "Telangana Express",
    source: "Hyderabad",
    destination: "New Delhi",
    departure: "06:00",
    arrival: "06:25",
    duration: "24h 25m",
    classes: {
      SL: 120,
      "3A": 80,
      "2A": 40,
      "1A": 10
    }
  },

  {
    id: 2,
    number: "12760",
    name: "Charminar Express",
    source: "Hyderabad",
    destination: "Chennai",
    departure: "18:30",
    arrival: "08:00",
    duration: "13h 30m",
    classes: {
      SL: 150,
      "3A": 90,
      "2A": 30
    }
  },

  {
    id: 3,
    number: "17015",
    name: "Visakha Express",
    source: "Secunderabad",
    destination: "Bhubaneswar",
    departure: "17:35",
    arrival: "08:20",
    duration: "14h 45m",
    classes: {
      SL: 180,
      "3A": 100,
      "2A": 35
    }
  },

  {
    id: 4,
    number: "12295",
    name: "Sanghamitra Express",
    source: "KSR Bengaluru",
    destination: "Patna",
    departure: "09:00",
    arrival: "16:30",
    duration: "31h 30m",
    classes: {
      SL: 200,
      "3A": 120,
      "2A": 45,
      "1A": 8
    }
  }
];

export default trains;
