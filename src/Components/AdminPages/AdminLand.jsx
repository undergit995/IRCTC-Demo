import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLand() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Railway Admin</h2>

        <div>
          <Link to="/admn">Dashboard</Link>

          <Link to="/admn/add-train">Add Train</Link>

          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLand;
