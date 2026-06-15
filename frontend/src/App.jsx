import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CustomerLogin from "./pages/CustomerLogin";
import AdminLogin from "./pages/AdminLogin";
import ServiceSelection from "./pages/ServiceSelection";
import DeviceSelection from "./pages/DeviceSelection";
import IssueSelection from "./pages/IssueSelection";
import ExtraItems from "./pages/ExtraItems";
import RepairSummary from "./pages/RepairSummary";
import TrackRepair from "./pages/TrackRepair";
import TrackingStatus from "./pages/TrackingStatus";
import AdminDashboard from "./pages/AdminDashboard";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/service-selection"
          element={<ServiceSelection />}
        />

        <Route
          path="/device-selection"
          element={<DeviceSelection />}
        />

        <Route
          path="/issue-selection"
          element={<IssueSelection />}
        />

        <Route
          path="/extra-items"
          element={<ExtraItems />}
        />

        <Route
          path="/repair-summary"
          element={<RepairSummary />}
        />


        <Route 
          path="/track" 
          element={<TrackRepair />} 
        />

        <Route
          path="/tracking-status"
          element={<TrackingStatus />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        
        <Route
          path="/ticket/:id"
          element={<TicketDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;