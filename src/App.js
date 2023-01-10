import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp";
import Desktop from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
