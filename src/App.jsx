import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Landing = lazy(() => import("./Components/LandingPage/Landing.jsx"));

const Login = lazy(() => import("./Components/LandingPage/Login.jsx"));

const Signup = lazy(() => import("./Components/Auth/Signup.jsx"));

const UserHome = lazy(() => import("./Components/UserPages/UserLand.jsx"));

const UserProfile = lazy(
  () => import("./Components/UserPages/UserProfile.jsx"),
);

const UserMaster = lazy(
  () => import("./Components/UserPages/UserMaster.jsx"),
);

const PaymentMethods = lazy(
  () => import("./Components/UserPages/PaymentMethods.jsx"),
);

const SearchTrains = lazy(
  () => import("./Components/UserPages/SearchTrains.jsx"),
);

const TrainResults = lazy(
  () => import("./Components/UserPages/TrainResults.jsx"),
);

const UserDetails = lazy(
  () => import("./Components/UserPages/UserDetails.jsx"),
);

const Payment = lazy(() => import("./Components/UserPages/Payment.jsx"));

const BookingConfirmation = lazy(
  () => import("./Components/UserPages/BookingConfirmation.jsx"),
);

const MyBookings = lazy(() => import("./Components/UserPages/MyBookings.jsx"));

const AdminLand = lazy(() => import("./Components/AdminPages/AdminLand.jsx"));

const AddTrain = lazy(() => import("./Components/AdminPages/AddTrain.jsx"));

const AdminLogin = lazy(() => import("./Components/AdminPages/AdminLogin.jsx"));

const ProtectedRoute = lazy(
  () => import("./Components/Auth/ProtectedRoute.jsx"),
);

function Loading() {
  return (
    <div className="loading-screen">
      <div className="loader"></div>

      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute role= "user" />}>
            <Route path="/user" element={<UserHome />} />

            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="/user/passengers" element={<UserMaster />} />

            <Route path="/user/payment-methods" element={<PaymentMethods />} />

            <Route path="/user/search" element={<SearchTrains />} />

            <Route path="/user/trains" element={<TrainResults />} />

            <Route
              path="/user/user-details"
              element={<UserDetails />}
            />

            <Route path="/user/payment" element={<Payment />} />

            <Route
              path="/user/confirmation"
              element={<BookingConfirmation />}
            />

            <Route path="/user/bookings" element={<MyBookings />} />
          </Route>

          <Route path="/admn/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admn" element={<AdminLand />}>
              <Route index element={<AddTrain />} />

              <Route path="add-train" element={<AddTrain />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
