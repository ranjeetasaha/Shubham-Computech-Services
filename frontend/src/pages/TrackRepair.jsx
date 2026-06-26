import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackRepair() {
  const [repairId, setRepairId] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (repairId.trim() !== "") {

      localStorage.setItem(
        "searchRepairId",
        repairId
      );

      navigate("/tracking-status");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Track Repair</h1>

        <input
          type="text"
          placeholder="Enter Repair ID / Serial Number / Mobile Number"
          value={repairId}
          onChange={(e) => setRepairId(e.target.value)}
        />

        <button onClick={handleTrack}>
          Track Repair
        </button>

      </div>
    </div>
  );
}

export default TrackRepair;