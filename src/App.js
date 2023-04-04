import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/routeGuard";
import Notify from "./shared/Notify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Home />{" "}
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Notify />
    </div>
  );
}

export default App;
