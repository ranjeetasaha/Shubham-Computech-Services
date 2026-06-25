import { Link } from "react-router-dom";

function IssueSelection() {

  const saveIssue = (issue) => {
    localStorage.setItem("selectedIssue", issue);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="options-container">
            <h1>Select Issue</h1>

            <Link to="/upload-media">
              <button onClick={() => saveIssue("Screen Damage")}>
                Screen Damage
              </button>
            </Link>

            <Link to="/upload-media">
              <button onClick={() => saveIssue("Battery Issue")}>
                Battery Issue
              </button>
            </Link>

            <Link to="/upload-media">
            <button onClick={() => saveIssue("Keyboard Issue")}>
              Keyboard Issue
            </button>
            </Link>

            <Link to="/upload-media">
            <button onClick={() => saveIssue("No Power")}>
              No Power
            </button>
            </Link>

            <Link to="/upload-media">
              <button onClick={() => saveIssue("Data Recovery")}>
                Data Recovery
              </button>
            </Link>
        </div>
        
      </div>

    </div>
  );
}



export default IssueSelection;