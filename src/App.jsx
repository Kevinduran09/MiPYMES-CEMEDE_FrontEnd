import "./App.css";
import { Admin } from "./layout/Admin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Admin />} />
          <Route
            path="*"
            element={<Navigate from="/" to="admin/dashboard" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
