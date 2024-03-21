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
          <Route path="/project" element={<DisplayProject/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
