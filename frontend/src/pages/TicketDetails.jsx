import { useParams } from "react-router-dom";

function TicketDetails() {
  const { id } = useParams();

  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  const ticket = tickets.find(
    (t) => t.id === id
  );

  if (!ticket) {
    return <h2>Ticket Not Found</h2>;
  }

  return (
    <div className="details-page">
      <div className="details-card">

        <h1>Repair Details</h1>

        <p><strong>Repair ID:</strong> {ticket.id}</p>

        <p><strong>Customer:</strong> {ticket.customer}</p>

        <p><strong>Mobile:</strong> {ticket.mobile}</p>

        <p><strong>Address:</strong> {ticket.address}</p>

        <p><strong>Device:</strong> {ticket.device}</p>

        <p><strong>Issue:</strong> {ticket.issue}</p>

        <p><strong>Extras:</strong> {ticket.extras}</p>

        <p><strong>Cost:</strong> ₹{ticket.cost}</p>

        <p><strong>Status:</strong> {ticket.status}</p>

      </div>
    </div>
  );
}

export default TicketDetails;