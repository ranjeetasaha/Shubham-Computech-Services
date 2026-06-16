import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminDashboard() {
  const [repairs, setRepairs] = useState(
    JSON.parse(localStorage.getItem("tickets")) || []
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const navigate = useNavigate();

  const updateStatus = (id, newStatus) => {

    const updatedRepairs =
      repairs.map((repair) =>
        repair.id === id
          ? { ...repair, status: newStatus }
          : repair
      );

    setRepairs(updatedRepairs);

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedRepairs)
    );
  };

  const deleteTicket = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this ticket?"
      );

    if (!confirmDelete) return;

    const updatedRepairs =
      repairs.filter(
        (repair) => repair.id !== id
      );

    setRepairs(updatedRepairs);

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedRepairs)
    );
  };

  const inProgress =
    repairs.filter(
      (repair) =>
        repair.status === "Repair In Progress"
    ).length;

  const readyPickup =
    repairs.filter(
      (repair) =>
        repair.status === "Ready For Pickup"
    ).length;  

  const revenue =
    repairs.reduce(
      (total, repair) =>
        total + Number(repair.cost),
      0
    );


  return (
    <div className="admin-container">
      <div className="admin-header">

        <img src="/logo.png" className="admin-logo" />
        <h1>Admin Dashboard</h1>
        <button className="logout-btn">
        Logout
        </button>

      </div>
      

      <div className="stats">
        <div className="card">
          <h2>{repairs.length}</h2>
          <p>Total Repairs</p>
        </div>

        <div className="card">
          <h2>{inProgress}</h2>
          <p>In Progress</p>
        </div>

        <div className="card">
          <h2>{readyPickup}</h2>
          <p>Ready Pickup</p>
        </div>

        <div className="card">
          <h2>₹{revenue}</h2>
          <p>Revenue</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Repair ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <table>
        <thead>
          <tr>
            <th>Repair ID</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Device</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Issue</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {repairs
            .filter((repair) =>
              repair.id
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((repair) => (
            <tr
              key={repair.id}
              onClick={() => navigate(`/ticket/${repair.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{repair.id}</td>
              <td>{repair.customer}</td>
              <td>{repair.mobile}</td>
              <td>{repair.device}</td>
              <td>{repair.status}</td>
              <td>₹{repair.cost}</td>
              <td>{repair.issue}</td>

              <td>
                <select
                  value={repair.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    updateStatus(repair.id, e.target.value)
                  }
                >
                  <option>
                    Device Received
                  </option>

                  <option>
                    Inspection Complete
                  </option>

                  <option>
                    Repair In Progress
                  </option>

                  <option>
                    Testing Pending
                  </option>

                  <option>
                    Ready For Pickup
                  </option>
                </select>
              </td>

              <td>
               <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTicket(repair.id);
                }}
               >
                Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;