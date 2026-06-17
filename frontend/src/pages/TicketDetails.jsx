import { useParams } from "react-router-dom";
import { useState } from "react";

function TicketDetails() {
  const { id } = useParams();

  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  const foundTicket =
    tickets.find((t) => t.id === id);

  const [notes, setNotes] =
    useState(foundTicket?.notes || "");

  if (!foundTicket) {
    return (
        <div className="admin-container">
        <h2>Ticket Not Found</h2>
        </div>
    );
  }

  const saveNotes = () => {
    const updatedTickets = tickets.map((t) =>
      t.id === id
        ? {
            ...t,
            notes: notes,
          }
        : t
    );

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedTickets)
    );

    alert("Notes Saved Successfully");
  };

  return (
    <div className="details-container">

      <h1>Customer Details</h1>

      <div className="details-card">

        <p><strong>Repair ID:</strong> {foundTicket.id}</p>

        <p><strong>Customer Name:</strong> {foundTicket.customer}</p>

        <p><strong>Mobile:</strong> {foundTicket.mobile}</p>

        <p><strong>Address:</strong> {foundTicket.address}</p>

        <p><strong>Device:</strong> {foundTicket.device}</p>

        <p><strong>Issue:</strong> {foundTicket.issue}</p>

        <h3
          style={{
          marginTop:"25px",
          color:"#7c3aed"
          }}
        >
          Customer Repair Notes
        </h3>

        <div
          style={{
            background:"#ffffff",
            padding:"20px",
            borderRadius:"15px",
            marginBottom:"25px",
            color:"#333",
            fontSize:"17px",
            lineHeight:"1.7"
          }}
        >
        {
          foundTicket.repairNotes ||

          "No repair notes available."
        }
        </div>

        <p><strong>Extras:</strong> {foundTicket.extras}</p>

        <p><strong>Cost:</strong> ₹{foundTicket.cost}</p>

        <p><strong>Status:</strong> {foundTicket.status}</p>

        <p><strong>Expected Delivery:</strong> {foundTicket.delivery}</p>

      

      <h3>Technician Notes</h3>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows="5"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px"
        }}
      />

      <button
        onClick={saveNotes}
        style={{
          marginTop: "15px"
        }}
      >
        Save Notes
      </button>
      </div>
    </div>
  );
}

export default TicketDetails;