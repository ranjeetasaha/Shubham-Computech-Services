function TrackingStatus() {

  const searchRepairId =
    localStorage.getItem("searchRepairId");

  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  const ticket =
    tickets.find(
      (t) => t.id === searchRepairId
    );

  if (!ticket) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h2>Ticket Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">

      {/* Details Card */}
      <div
        className="login-card"
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Repair Status</h1>

        <p><b>Repair ID:</b> {ticket.id}</p>
        <p><b>Customer:</b> {ticket.customer}</p>
        <p><b>Device:</b> {ticket.device}</p>
        <p><b>Issue:</b> {ticket.issue}</p>
        <p><b>Status:</b> {ticket.status}</p>
        <p><b>Estimated Cost:</b> ₹{ticket.cost}</p>
        <p><b>Delivery Date:</b> {ticket.delivery}</p>
      </div>

      {/* Progress Card */}
      <div className="progress-card">
        <h2>Repair Progress</h2>

        <div className="timeline">

          <div className="step completed">
            <div className="circle">✓</div>
            <div className="label">Device Received</div>
          </div>

          <div className="step completed">
            <div className="circle">✓</div>
            <div className="label">Inspection Complete</div>
          </div>

          <div className="step active">
            <div className="circle">⚙</div>
            <div className="label">Repair In Progress</div>
          </div>

          <div className="step pending">
            <div className="circle">○</div>
            <div className="label">Testing Pending</div>
          </div>

          <div className="step pending">
            <div className="circle">○</div>
            <div className="label">Ready For Pickup</div>
          </div>

          <h3 style={{ marginTop: "30px" }}>
            Technician Notes
          </h3>

          <div
            style={{
              background: "#2d3748",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
              color: "white",
              minHeight: "80px",
            }}
          >
            {ticket.notes || "No notes available yet."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingStatus;