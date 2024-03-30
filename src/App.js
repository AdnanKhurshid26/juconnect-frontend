import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import StudentProfile from "./pages/StudentProfile";
import CreateProject from "./pages/ProjectCreate";
import SignUp from "./pages/SignUp";
import OtpPage from "./pages/OtpPage";
import DisplayProject from "./pages/DisplayProject";
import FacultyLogin from "./pages/FacultyLogin";
import FacultySignup from "./pages/FacultySignup";
import FacultyProfile from "./pages/FacultyProfile";
import StudentProfileView from "./pages/StudentProfileView";
import FacultyProfileView from "./pages/FacultyProfileView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/student-profile" element={<StudentProfile/>}></Route>
          <Route path="/notifications" element={<Notifications/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/add-project" element={<CreateProject/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/otp" element={<OtpPage/>}></Route>
          <Route path="/project/:id" element={<DisplayProject/>}></Route>
          <Route path="/faculty-login" element={<FacultyLogin/>}></Route>
          <Route path="/faculty-signup" element={<FacultySignup/>}></Route>
          <Route path="/faculty-profile" element={<FacultyProfile/>}></Route>
          <Route path="/student-profile-view/:email" element={<StudentProfileView/>}></Route>
          <Route path="/faculty-profile-view/:email" element={<FacultyProfileView/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
