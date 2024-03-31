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
import UnauthorizedPage from "./pages/Unauthorized";
import { verifyToken } from "./utils/verify";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {

  function ProtectedRoute(element){
    return verifyToken() ? element : <UnauthorizedPage/>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={ProtectedRoute(<Home/>)}></Route>
          <Route path="/student-profile" element={ProtectedRoute(<StudentProfile/>)}></Route>
          <Route path="/notifications" element={ProtectedRoute(<Notifications/>)}></Route>
          <Route path="/search" element={ProtectedRoute(<Search/>)}></Route>
          <Route path="/create-project" element={ProtectedRoute(<CreateProject/>)}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/otp" element={<OtpPage/>}></Route>
          <Route path="/project/:id" element={ProtectedRoute(<DisplayProject/>)}></Route>
          <Route path="/faculty-login" element={<FacultyLogin/>}></Route>
          <Route path="/faculty-signup" element={<FacultySignup/>}></Route>
          <Route path="/faculty-profile" element={ProtectedRoute(<FacultyProfile/>)}></Route>
          <Route path="/student-profile-view/:email" element={ProtectedRoute(<StudentProfileView/>)}></Route>
          <Route path="/faculty-profile-view/:email" element={ProtectedRoute(<FacultyProfileView/>)}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
