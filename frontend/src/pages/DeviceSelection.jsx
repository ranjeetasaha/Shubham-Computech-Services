import { Link } from "react-router-dom";

function DeviceSelection() {
  const saveDevice = (device) => {
    localStorage.setItem("selectedDevice", device);
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

        <Link to="/issue-selection">
          <button onClick={() => saveDevice("Other")}>
            Other
          </button>
        </Link>
        </div>
        
      </div>

    </div>
  );
}

export default DeviceSelection;