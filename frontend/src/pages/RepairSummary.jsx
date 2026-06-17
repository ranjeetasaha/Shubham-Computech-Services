import { useEffect, useState } from "react";


function RepairSummary() {

  const repairId =
    localStorage.getItem("repairId");

  const latestTicket =
    JSON.parse(localStorage.getItem("latestTicket"));

  let estimatedPrice =
    localStorage.getItem("estimatedPrice");

  if (!estimatedPrice) {
    estimatedPrice =
      Math.floor(500 + Math.random() * 5000);

    localStorage.setItem(
      "estimatedPrice",
      estimatedPrice
    );
  }

  let recoveryDate =
    localStorage.getItem("recoveryDate");

  if (!recoveryDate) {
    recoveryDate = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString();

    localStorage.setItem(
      "recoveryDate",
      recoveryDate
    );
  }

  const ticket = {
    id: repairId,
    customer: localStorage.getItem("customerName"),
    mobile: localStorage.getItem("customerMobile"),
    address: localStorage.getItem("customerAddress"),
    device: localStorage.getItem("selectedDevice"),
    issue: localStorage.getItem("selectedIssue"),
    extras: localStorage.getItem("extraItems"),
    status: "Device Received",
    cost: estimatedPrice,
    delivery: recoveryDate,
    repairNotes:
    localStorage.getItem("repairNotes") || "",
    notes: ""
  };

  localStorage.setItem(
    "latestTicket",
    JSON.stringify(ticket)
  );

  console.log(
    "Selected Device:",
    localStorage.getItem("selectedDevice")
  );

  const [notes, setNotes] = useState("");

  const saveNotes = () => {

    const updatedTickets =
      JSON.parse(localStorage.getItem("tickets")) || [];

    const newTickets = updatedTickets.map((t)=>

      t.id === repairId

      ? {

          ...t,

          repairNotes: notes

        }

      : t

    );

    localStorage.setItem(
      "tickets",
      JSON.stringify(newTickets)
    );

    alert("Notes Saved Successfully");
  };

  useEffect(() => {
    const existingTickets =
      JSON.parse(localStorage.getItem("tickets")) || [];

    const ticketExists = existingTickets.find(
      (t) => t.id === repairId
    );

    if (!ticketExists) {
      existingTickets.push(ticket);

      localStorage.setItem(
        "tickets",
        JSON.stringify(existingTickets)
      );
    }
  }, []);

  return (
    <div className="login-page">

      <div
        className="login-card"
        style={{
            textAlign: "center",
            color: "white"
        }}
        >
        
        <h1>Repair Ticket Generated</h1>
        
        <h2 style={{ color: "white" }}>Repair ID</h2>
        <p style={{ color: "yellow" }}>{latestTicket?.id}</p>

        <h2 style={{ color: "white" }}>Estimated Cost</h2>
        <p style={{ color: "yellow" }}>₹ {latestTicket?.cost}</p>

        <h2 style={{ color: "white" }}>Expected Delivery</h2>
        <p style={{ color: "yellow" }}>{latestTicket?.delivery}</p>
        
        <hr />

        <h3>Repair Notes</h3>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="6"
          placeholder="Enter repair notes here..."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginTop: "10px",
            resize: "none"
          }}
        />

        <button
          onClick={saveNotes}
          style={{ marginTop: "15px" }}
        >
          Save Notes
        </button>

      </div>
    </div>
  );
}

export default RepairSummary;

