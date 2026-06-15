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
    </div>
  );
}

export default TrackingStatus;