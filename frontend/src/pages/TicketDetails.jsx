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



  if (!ticket) {
    return (
      <div className="admin-container">
        <h2>Ticket Not Found</h2>
      </div>
    );
  }

  return (
    <div className="details-container">

      <h1>Customer Details</h1>

      <div className="details-card">

        <p><strong>Repair ID:</strong> {ticket.id}</p>

        <p><strong>Customer Name:</strong> {ticket.customer}</p>

        <p><strong>Mobile:</strong> {ticket.mobile}</p>

        <p><strong>Address:</strong> {ticket.address}</p>

        <p><strong>Device:</strong> {ticket.device}</p>

        <p><strong>Issue:</strong> {ticket.issue}</p>

        <p><strong>Extras:</strong> {ticket.extras}</p>

        <p><strong>Cost:</strong> ₹{ticket.cost}</p>

        <p><strong>Status:</strong> {ticket.status}</p>

        <p><strong>Expected Delivery:</strong> {ticket.delivery}</p>

      </div>

    </div>
  );
}

export default TicketDetails;