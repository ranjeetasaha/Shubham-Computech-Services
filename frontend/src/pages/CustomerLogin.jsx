import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {

    localStorage.setItem("customerName", name);
    localStorage.setItem("customerMobile", mobile);
    localStorage.setItem("customerAddress", address);

    console.log({
      name,
      mobile,
      address,
    });

    navigate("/service-selection");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Customer Information</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows="6"
          style={{
            width:"100%",
            padding:"10px"
          }}
        />


        <button
          onClick={() => {

            const updatedTickets =
              tickets.map((t) =>
                t.id === id
                  ? {
                      ...t,
                      notes
                    }
                  : t
              );

            localStorage.setItem(
              "tickets",
              JSON.stringify(updatedTickets)
            );

            alert("Notes Saved");
          }}
        >
          Save Notes
        </button>

        <button onClick={handleSubmit}>
          Continue
        </button>

      </div>

    </div>
  );
}

export default CustomerLogin;