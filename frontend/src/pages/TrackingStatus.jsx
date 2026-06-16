import jsPDF from "jspdf";


function TrackingStatus() {

  const searchRepairId =
    localStorage.getItem("searchRepairId");

  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  const ticket =
    tickets.find(
      (t) => t.id === searchRepairId
    );

  const steps = [
    "Device Received",
    "Inspection Complete",
    "Repair In Progress",
    "Testing Pending",
    "Ready For Pickup",
    "Delivered"
  ];

  const currentIndex = steps.indexOf(ticket.status);
  
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SCS DANTEWADA", 20, 20);

    doc.setFontSize(12);

    doc.text(`Repair ID: ${ticket.id}`,20,40);
    doc.text(`Customer: ${ticket.customer}`,20,50);
    doc.text(`Mobile: ${ticket.mobile}`,20,60);

    doc.text(`Device: ${ticket.device}`,20,80);
    doc.text(`Issue: ${ticket.issue}`,20,90);

    doc.text(`Status: ${ticket.status}`,20,110);

    doc.text(`Cost: ₹${ticket.cost}`,20,120);

    doc.text(
      `Delivery: ${ticket.delivery}`,
      20,
      130
    );

    doc.text(
      `Notes: ${ticket.notes || "No notes"}`,
      20,
      150
    );

    doc.save(`${ticket.id}.pdf`);
  };

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

          {steps.map((step, index) => (

            <div
              key={step}
              className={
                index < currentIndex
                  ? "step completed"
                  : index === currentIndex
                  ? "step active"
                  : "step pending"
              }
            >

              <div className="circle">
                {
                  index < currentIndex
                  ? "✓"
                  : index === currentIndex
                  ? "⚙"
                  : "○"
                }
              </div>

              <div className="label">
                {step}
              </div>

            </div>

          ))}

        </div>
          <h3 style={{ marginTop: "40px" }}>
            Technician Notes
          </h3>

          <div className="notes-box">
            {ticket.notes || "No notes available yet."}
          </div>
          <button
            className="download-btn"
            onClick={downloadPDF}
          >
            Download Receipt PDF
          </button>
        </div>

    </div>
  );
}

export default TrackingStatus;