import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ role }) {

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (role && user.role !== role) {

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admn"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/user"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
