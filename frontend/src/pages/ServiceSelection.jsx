import { Link } from "react-router-dom";

function ServiceSelection() {
  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Select Service</h1>

        <Link to="/device-selection">
            <button className="service-btn">
                Repairing Electronics
            </button>
        </Link>

        <button className="service-btn">
            Form Filling
        </button>

      </div>

    </div>
  );
}

export default ServiceSelection;