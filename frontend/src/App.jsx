import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Protect from "./pages/Protect";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import MyProfile from "./pages/MyProfile";
import Write from "./pages/Write";

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
        <Route
          path="/blogs/:id"
          element={
            <Protect>
              <Blog/>
            </Protect>
          }
        ></Route>
        <Route
          path="/user/:id"
          element={
            <Protect>
              <Profile/>
            </Protect>
          }
        ></Route>
        <Route
          path="/user/profile"
          element={
            <Protect>
              <MyProfile/>
            </Protect>
          }
        ></Route>
        <Route
          path="/write"
          element={
            <Protect>
              <Write/>
            </Protect>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
       

      </Routes>
    </>
  );
}

export default App;
