import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "./Layout/MainLayout";

import { LogIn } from "./Pages/LogIn/LogIn";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Error404 } from "./Pages/Error404/Error404";

export function App() {
  return (
    <>
      <div className="glow-overlay"></div>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}
