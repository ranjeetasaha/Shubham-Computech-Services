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

        <p><strong>Serial Number: </strong>{foundTicket.serialNumber || "Not Assigned Yet"}</p>

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

        <hr style={{ margin: "25px 0" }} />

        <h3 style={{ color: "#7c3aed" }}>
          Previous Repair History
        </h3>

        {
          (() => {

            const history = tickets.filter((t) =>

              t.id !== foundTicket.id &&

              (

                t.mobile === foundTicket.mobile ||

                (

                  foundTicket.serialNumber &&

                  t.serialNumber === foundTicket.serialNumber

                )

              )

            );

            return history.length > 0 ? (

              history.map((item) => (

                <div
                  className="history-item"
                  key={item.id}
                >

                  <p><strong>Repair ID:</strong> {item.id}</p>

                  <p><strong>Device:</strong> {item.device}</p>

                  <p><strong>Issue:</strong> {item.issue}</p>

                  <p><strong>Status:</strong> {item.status}</p>

                  <p><strong>Delivery:</strong> {item.delivery}</p>

                </div>

              ))

            ) : (

              <p>No previous repair history found.</p>

            );

          })()
        }


        <h3
          style={{
            marginTop: "30px",
            color: "#7c3aed"
          }}
        >
          Uploaded Media
        </h3>

        <div className="media-gallery">

          {foundTicket.media &&
          foundTicket.media.length > 0 ? (

            foundTicket.media.map((item, index) => (

              <div
                className="admin-media-card"
                key={index}
              >

                {
                  item.type.startsWith("image")

                  ?

                  <img
                    src={item.preview}
                    alt=""
                    className="admin-media"
                  />

                  :

                  <video
                    controls
                    className="admin-media"
                  >
                    <source src={item.preview} />
                  </video>

                }

              </div>

            ))

          ) : (

            <p
              style={{
                color: "#666",
                marginTop: "10px"
              }}
            >
              No media uploaded.
            </p>

          )}

        </div>

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