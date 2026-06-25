import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jsPDF } from "jspdf";
import logo from "/logo.png";


function AdminDashboard() {
  const [repairs, setRepairs] = useState(
    JSON.parse(localStorage.getItem("tickets")) || []
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const navigate = useNavigate();

  const updateStatus = (id, newStatus) => {

    const updatedRepairs =
      repairs.map((repair) =>
        repair.id === id
          ? { ...repair, status: newStatus }
          : repair
      );

    setRepairs(updatedRepairs);

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedRepairs)
    );
  };

  const updateField = (id, field, value) => {
    const updatedRepairs = repairs.map((repair) =>

      repair.id === id
        ? {
            ...repair,
            [field]: value
          }
        : repair

    );

    setRepairs(updatedRepairs);

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedRepairs)
    );

  };

  const deleteTicket = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this ticket?"
      );

    if (!confirmDelete) return;

    const updatedRepairs =
      repairs.filter(
        (repair) => repair.id !== id
      );

    setRepairs(updatedRepairs);

    localStorage.setItem(
      "tickets",
      JSON.stringify(updatedRepairs)
    );
  };

  const inProgress =
    repairs.filter(
      (repair) =>
        repair.status === "Repair In Progress"
    ).length;

  const readyPickup =
    repairs.filter(
      (repair) =>
        repair.status === "Ready For Pickup"
    ).length;  

  const revenue =
    repairs.reduce(
      (total, repair) =>
        total + Number(repair.cost),
      0
    );

  const sendWhatsApp = (repair) => {

    const message =
      `Hello ${repair.customer},

      Your device repair is completed.

      Repair ID: ${repair.id}

      Device: ${repair.device}

      Issue: ${repair.issue}

      Repair Cost: Rs.${repair.cost}

      Delivery Date: ${repair.delivery}

      Status: ${repair.status}

      Please collect your device from Shubham Computech Services.

      Thank You 😊`;
    const url =
      `https://wa.me/91${repair.mobile}?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank"
    );

  };


  const downloadPDF = (repair) => {

    const doc = new jsPDF();

    const img = new Image();

    img.src = logo;

    img.onload = () => {

      // Header Background

      doc.setFillColor(93, 63, 211);

      doc.rect(
        0,
        0,
        210,
        35,
        "F"
      );

      doc.addImage(
        img,
        "PNG",
        10,
        5,
        22,
        22
      );

      // Header Text

      doc.setTextColor(255, 255, 255);

      doc.setFontSize(30);

      doc.text(
        "SHUBHAM COMPUTECH",
        40,
        16
        );

      doc.setFontSize(12);

      doc.text(
        "Electronic Repair & Digital Service Center",
        40,
        26
      );

      // Divider

      doc.setDrawColor(
        93,
        63,
        211
      );

      doc.line(
        20,
        42,
        190,
        42
      );

      // Invoice Title

      doc.setTextColor(0,0,0);

      doc.setFontSize(20);

      doc.text(
        "REPAIR INVOICE",
        62,
        55
      );

      doc.setDrawColor(
        220,
        220,
        220
      );

      doc.roundedRect(
        15,
        62,
        180,
        130,
        4,
        4
      );

      // Repair ID

      doc.setFont(undefined,"bold");

      doc.text(
        "Repair ID :",
        20,
        75
      );

      doc.setFont(undefined,"normal");

      doc.text(repair.id, 105, 75, { 
          align: "center" 
      });



      // Customer

      doc.setFont(undefined,"bold");

      doc.text(
        "Customer :",
        20,
        90
      );

      doc.setFont(undefined,"normal");

      doc.text(repair.customer, 105, 90, {
        align: "center"
      });


      // Mobile

      doc.setFont(undefined,"bold");

      doc.text(
        "Mobile :",
        20,
        105
      );

      doc.setFont(undefined,"normal");

      doc.text(String(repair.mobile), 105, 105, {
        align: "center"
      });



      // Device

      doc.setFont(undefined,"bold");

      doc.text(
        "Device :",
        20,
        120
      );

      doc.setFont(undefined,"normal");

      doc.text(repair.device, 105, 120, {
        align: "center"
      });


      // Issue

      doc.setFont(undefined,"bold");

      doc.text(
        "Issue :",
        20,
        135
      );

      doc.setFont(undefined,"normal");

      doc.text(repair.issue, 105, 135, {
        align: "center"
      });


      // Cost

      doc.setFont(undefined,"bold");

      doc.text(
        "Cost :",
        20,
        150
      );

      doc.setFont(undefined,"normal");

      doc.text(`Rs. ${repair.cost}`, 105, 150, {
        align: "center"
      });


      // Status

      doc.setFont(undefined,"bold");

      doc.text(
        "Status :",
        20,
        165
      );

      doc.setFont(undefined,"normal");

      doc.text(repair.status, 105, 165, {
        align: "center"
      });


      // Delivery Date

      doc.setFont(undefined,"bold");

      doc.text(
        "Delivery Date:",
        20,
        180
      );

      doc.setFont(undefined,"normal");

      doc.text(
        String(repair.delivery || "Not Set"),
        105,
        180,
        {
          align: "center"
        }
      );


      // Footer Line

      // Footer Line

      doc.setDrawColor(200, 200, 200);

      doc.line(
        20,
        210,
        190,
        210
      );


      // Thank You

      doc.setFontSize(14);

      doc.setTextColor(0,0,0);

      doc.text(
        "Thank You For Choosing Us",
        105,
        225,
        {
          align: "center"
        }
      );


      // Visit Again

      doc.setFontSize(12);

      doc.text(
        "Visit Again!",
        105,
        235,
        {
          align: "center"
        }
      );


      // Company Name

      doc.setFontSize(22);

      doc.setTextColor(
        93,
        63,
        211
      );

      doc.text(
        "SHUBHAM COMPUTECH",
        105,
        250,
        {
          align: "center"
        }
      );

      doc.save(
        `${repair.id}_Invoice.pdf`
      );

    };
  };

  return (
    <div className="admin-container">
      <div className="admin-header">

        <img src="/logo.png" className="admin-logo" />
        <h1>Admin Dashboard</h1>
        <button className="logout-btn">
        Logout
        </button>

      </div>
      

      <div className="stats">
        <div className="card">
          <h2>{repairs.length}</h2>
          <p>Total Repairs</p>
        </div>

        <div className="card">
          <h2>{inProgress}</h2>
          <p>In Progress</p>
        </div>

        <div className="card">
          <h2>{readyPickup}</h2>
          <p>Ready Pickup</p>
        </div>

        <div className="card">
          <h2>₹{revenue}</h2>
          <p>Revenue</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Repair ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Repair ID</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Device</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Delivery Date</th>
              <th>Issue</th>
              <th>Action</th>
              <th>Invoice</th>
              <th>WhatsApp</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {repairs
              .filter((repair) =>
                repair.id
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((repair) => (
              <tr
                key={repair.id}
                onClick={() => navigate(`/ticket/${repair.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{repair.id}</td>
                <td>{repair.customer}</td>
                <td>{repair.mobile}</td>
                <td>{repair.device}</td>
                <td>{repair.status}</td>
                <td>
                  <input
                    type="text"
                    value={repair.cost}
                    className="edit-input"
                    onClick={(e)=>
                      e.stopPropagation()
                    }
                    onChange={(e)=>

                      updateField(
                        repair.id,
                        "cost",
                        e.target.value

                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={repair.delivery || ""}
                    className="edit-input"
                    onClick={(e)=>
                      e.stopPropagation()
                    }
                    onChange={(e)=>
                      updateField(
                        repair.id,
                        "delivery",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>{repair.issue}</td>

                <td>
                  <select
                    value={repair.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateStatus(repair.id, e.target.value)
                    }
                  > 
                    <option>Device Not Received</option>
                    
                    <option>Device Received</option>

                    <option>Inspection Complete</option>

                    <option>Repair In Progress</option>

                    <option>Testing Pending</option>

                    <option> Ready For Pickup</option>
                  </select>
                </td>
                
                <td>
                  <button
                  className="invoice-btn"

                  onClick={(e)=>{

                  e.stopPropagation();

                  downloadPDF(repair);

                  }}
                  >
                  Invoice
                  </button>
                </td>
                
                <td>
                  {repair.status === "Ready For Pickup" && (

                  <button
                    className="whatsapp-btn"
                    onClick={(e)=>{
                      e.stopPropagation();
                      sendWhatsApp(repair);
                    }}
                  >
                    📲Notify
                  </button>
                  )}
                </td>

                <td>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTicket(repair.id);
                  }}
                >
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;