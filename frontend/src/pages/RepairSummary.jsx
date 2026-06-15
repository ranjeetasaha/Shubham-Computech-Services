import { useEffect } from "react";


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
    mobile: localStorage.getItem("customerMobile"),
    issue: localStorage.getItem("selectedIssue"),
    extras: localStorage.getItem("extraItems"),
    status: "Device Received",
    cost: estimatedPrice,
    delivery: recoveryDate,
  };

  localStorage.setItem(
    "latestTicket",
    JSON.stringify(ticket)
  );

  console.log(
    "Selected Device:",
    localStorage.getItem("selectedDevice")
  );

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

      </div>
    </div>
  );
}

export default RepairSummary;

