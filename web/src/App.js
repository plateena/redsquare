import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VehicleListing from './components/VehicleListing';

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to Vehicle Management System</h1>
      <p>This is a simple web application to manage vehicles.</p>
      <Link to="/vehicles">View Vehicle List</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/vehicles" element={<VehicleListing />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;