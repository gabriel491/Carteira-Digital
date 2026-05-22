import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando a URL for http://localhost:5173/ mostra o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Quando a URL for http://localhost:5173/dashboard mostra o Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;