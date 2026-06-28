import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function DeviceSelection() {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const [otherDevice, setOtherDevice] = useState("");
  const navigate = useNavigate();

  const saveDevice = (device) => {
    localStorage.setItem("selectedDevice", device);
  };

  const saveOtherDevice = () => {

    if (!otherDevice.trim()) {
      alert("Please enter the device name.");
      return;
    }

    localStorage.setItem("selectedDevice", otherDevice);

    navigate("/issue-selection");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>What do you want to repair?</h1>
        <div className="options-container">
          <Link to="/issue-selection">
            <button onClick={() => saveDevice("Laptop")}>
              Laptop
            </button>
          </Link>

        <Link to="/issue-selection">
          <button onClick={() => saveDevice("Printer")}>
            Printer
          </button>
        </Link>
          
        <Link to="/issue-selection">
          <button onClick={() => saveDevice("Monitor")}>
            Monitor
          </button>
        </Link>

        <Link to="/issue-selection">
          <button onClick={() => saveDevice("Hard Disk")}>
            Hard Disk
          </button>
        </Link>

        <Link to="/issue-selection">
          <button onClick={() => saveDevice("CCTV")}>
            CCTV
          </button>
        </Link>

        <Link to="/issue-selection">
          <button onClick={() => saveDevice("UPS")}>
            UPS
          </button>
        </Link>

        
        <button
            onClick={() => setShowOtherInput(true)}
        >
          Other
        </button>

         {showOtherInput && (

          <div className="other-device-box">

              <input
                  type="text"
                  placeholder="Enter device name"
                  value={otherDevice}
                  onChange={(e)=>setOtherDevice(e.target.value)}
              />

              <button
                  className="continue-btn"
                  onClick={saveOtherDevice}
              >
                  Continue
              </button>

        </div>

        )}
        
        </div>
        
      </div>

    </div>
  );
}

export default DeviceSelection;