import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MentorProfile from "./pages/MentorProfile/MentorProfile";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import MyBookings from "./pages/MyBookings/MyBookings";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import {Navigate} from "react-router-dom";

function App() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  return (
    <Routes>
      <Route path="/" element={user?.role==="mentor"? <Navigate to="/mentor-profile"/> :<Home />} />
      <Route
        path="/mentor/:id"
        element={<MentorProfile />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RoleSelection/>} />
      <Route path="/signup/details" element={<Signup/>} />
      <Route path="/my-bookings" element={<MyBookings/>} />
      <Route path="/profile" element={<StudentProfile/>}></Route>
      <Route path="/mentor-profile" element={<MentorProfile/>}></Route>
    </Routes>
  );
}

export default App;