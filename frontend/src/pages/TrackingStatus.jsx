import jsPDF from "jspdf";


function TrackingStatus() {

  const searchRepairId =
    localStorage.getItem("searchRepairId");

  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  const search =
    searchRepairId.trim().toLowerCase();

  const ticket =
    tickets.find((t) =>

      (t.id || "")
        .toLowerCase() === search ||

      (t.serialNumber || "")
        .toLowerCase() === search ||

      (t.mobile || "") === search

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

  if (ticket.status === "Device Not Received") {
    return (
      <div className="login-page">

        <div className="tracking-status-card">

          <h1>Repair Status</h1>

          <div className="warning-icon">⚠</div>

          <h2 className="warning-title">
            Device Not Received
          </h2>

          <p className="warning-text">
            We have not yet received your device.
          </p>

          <p className="warning-text">
            Please visit
            <strong> Shubham Computech Services </strong>
            and submit your device to start the repair process.
          </p>

          <div className="tracking-details">

            <p><strong>Repair ID:</strong> {ticket.id}</p>

            <p><strong>Customer:</strong> {ticket.customer}</p>

            <p><strong>Device:</strong> {ticket.device}</p>

            <p><strong>Issue:</strong> {ticket.issue}</p>

          </div>

        </div>

      </div>
    );
  }




  const steps = [
    "Device Received",
    "Inspection Complete",
    "Repair In Progress",
    "Testing Pending",
    "Ready For Pickup",
    "Delivered"
  ];

  const currentIndex = steps.indexOf(ticket.status);

  const visitHistory =
    tickets.filter((t) =>

      t.id !== ticket.id &&

      (

        t.mobile === ticket.mobile ||

        (
          ticket.serialNumber &&
          t.serialNumber === ticket.serialNumber
        )

      )

    );

  const totalVisits =
    visitHistory.length + 1;
  
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
        className="status-card"
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Repair Status</h1>

        <p className="ticket-detail">
          Repair ID :  <span>{ticket.id}</span>
        </p>

        <p className="ticket-detail">
          Customer :  <span>{ticket.customer}</span>
        </p>

        <p className="ticket-detail">
          Device :  <span>{ticket.device}</span>
        </p>

        <p className="ticket-detail">
          Issue :  <span>{ticket.issue}</span>
        </p>

        <p className="ticket-detail">
          Status :  <span>{ticket.status}</span>
        </p>

        <p className="ticket-detail">
          Estimated Cost :  <span>{ticket.cost}</span>
        </p>

        <p className="ticket-detail">
          Delivery Date :  <span>{ticket.delivery}</span>
        </p>

        <hr
          style={{
            margin: "20px 0"
          }}
        />

        <h3
          style={{
            color: "#ffd700",
            marginTop: "20px"
          }}
        >
          Previous Repair History
        </h3>

        <p className="ticket-detail">
          Total Visits :
          <span>{totalVisits}</span>
        </p>

        <div className="history-box">

          {

            visitHistory.length > 0

            ?

            visitHistory.map((item) => (

              <div
                className="history-item"
                key={item.id}
              >

                <p>
                  <strong>
                    {item.id}
                  </strong>
                </p>

                <p>
                  Device: {item.device}
                </p>

                <p>
                  Issue: {item.issue}
                </p>

                <p>
                  Status: {item.status}
                </p>

                <p>
                  Delivery Date: {item.delivery}
                </p>
              </div>

            ))

            :

            <p
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              No previous repair history found.
            </p>

          }

        </div>
      </div>

      {/* Progress Card */}
      <div className="progress-card">
        <h2 className="progress-title">Repair Progress</h2>

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
          <h3
            style={{
              marginTop: "35px",
              color: "white"
            }}
          >
            Uploaded Photos / Videos
          </h3>

          <div className="tracking-media-gallery">

            {
              ticket.media &&
              ticket.media.length > 0

              ?

              ticket.media.map((item,index)=>(

                <div
                  className="tracking-media-card"
                  key={index}
                >

                  {

                  item.type.startsWith("image")

                  ?

                  <img
                    src={item.preview}
                    className="tracking-media"
                    alt=""
                  />

                  :

                  <video
                    controls
                    className="tracking-media"
                  >
                    <source
                      src={item.preview}
                    />
                  </video>

                  }

                </div>

              ))

              :

              <p
                style={{
                  color:"white"
                }}
              >
                No media uploaded.
              </p>

            }

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