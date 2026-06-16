import { Link } from "react-router-dom";

function Home() {


  return (
    <div className="home">
      <div className="logo-container">
        <img
          src="/logo.png"
          alt="Shubham Computech"
          className="main-logo"
        />
      </div>
      
        <div className="hero-section">

        <h1 className="main-title">
          Welcome to Shubham Computech Services
        </h1>

        <p className="subtitle">
          Electronic Repair & Digital Service Center
        </p>

        <p className="tagline">
          Repair • Service • Maintenance
        </p>

        

        <div className="btn-group">

          <Link to="/customer-login">
            <button className="customer-btn">
              Customer Login
            </button>
          </Link>

          <Link to="/admin-dashboard">
            <button className="admin-btn">
              Admin Login
            </button>
          </Link>

        <Link to="/track">
          <button className="track-btn"
            style={{
              padding: "15px 30px",
              border: "none",
              borderRadius: "10px",
              background: "#9333ea",
              color: "white",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Track Repair
          </button>
        </Link>
        </div>

      </div>

      <div className="cards">

        <div className="repair-card">
          <h2>🖥 Electronic Repair</h2>

          <ul>
            <li>Laptop Repair</li>
            <li>Printer Repair</li>
            <li>Monitor Repair</li>
            <li>Hard Disk Recovery</li>
            <li>CCTV Repair</li>
            <li>UPS Repair</li>
          </ul>
        </div>

        <div className="form-card">
          <h2>📄 Form Filling</h2>

          <ul>
            <li>Scholarship Forms</li>
            <li>Government Forms</li>
            <li>Online Applications</li>
            <li>Registration Services</li>
          </ul>
        </div>

      </div>

      <div className="why-choose">

        <h2>Why Choose Us</h2>

        <div className="features">

          <div className="feature-box">
            <h3>⏰ Fast Turnaround</h3>
            <p>
              Get your devices back quickly with our efficient
              repair process and skilled technicians.
            </p>
          </div>

          <div className="feature-box">
            <h3>✔ Expert Technicians</h3>
            <p>
              Experienced professionals for laptops,
              desktops, printers and electronic devices.
            </p>
          </div>

          <div className="feature-box">
            <h3>🛡 Quality Guarantee</h3>
            <p>
              Reliable repair service with quality assurance
              and customer satisfaction.
            </p>
          </div>

        </div>

      </div>

      <div className="services-section">

        <h2>Our Services</h2>

        <div className="service-grid">

          <div className="service-item">
            Laptop Repair
          </div>

          <div className="service-item">
            Printer Repair
          </div>

          <div className="service-item">
            UPS Repair
          </div>

          <div className="service-item">
            CCTV Installation
          </div>

          <div className="service-item">
            Online Form Filling
          </div>

          <div className="service-item">
            Government Registration
          </div>

        </div>

      </div>

      <footer className="footer">
        <h3>Need Our Services?</h3>
        <p>
            Login to your account to book a repair or track your existing service request.<br />
            Or contact us directly for any inquiries or support.
        </p>
        <p style={{fontWeight: "bolder"}}>
            Contact: +91 99267 47215
        </p>
      </footer>

    </div>
    
  );
}


export default Home;