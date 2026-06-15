import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExtraItems() {

  const navigate = useNavigate();

  const [extraItems, setExtraItems] = useState("");

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Extra Items Received</h1>

        <textarea
          placeholder="Example: Charger, Laptop Bag, Mouse"
          value={extraItems}
          onChange={(e) => setExtraItems(e.target.value)}
        />

        <button
          onClick={() => {

            const repairId =
              "SC" + Math.floor(100000 + Math.random() * 900000);

            localStorage.setItem("repairId", repairId);
            localStorage.setItem("extraItems", extraItems);

            navigate("/repair-summary");
          }}
        >
          Generate Repair Ticket
        </button>

      </div>

    </div>
  );
}

export default ExtraItems;