import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Protect from "./pages/Protect";
import Home from "./pages/Home";

Register;
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
