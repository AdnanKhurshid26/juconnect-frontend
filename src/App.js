import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
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
import UpdateProject from "./pages/UpdateProject";
function App() {
  function ProtectedRoute({ element }) {
    return verifyToken() ? element : <UnauthorizedPage />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/home2" element={<Home2 />} />
          <Route
            path="/student-profile"
            element={<ProtectedRoute element={<StudentProfile />} />}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute element={<Notifications />} />}
          />
          <Route
            path="/search"
            element={<ProtectedRoute element={<Search />} />}
          />
          <Route
            path="/create-project"
            element={<ProtectedRoute element={<CreateProject />} />}
          />
          <Route
            path="/update-project"
            element={<ProtectedRoute element={<UpdateProject />} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route
            path="/project/:id"
            element={<ProtectedRoute element={<DisplayProject />} />}
          />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-signup" element={<FacultySignup />} />
          <Route
            path="/faculty-profile"
            element={<ProtectedRoute element={<FacultyProfile />} />}
          />
          <Route
            path="/student-profile-view/:email"
            element={<ProtectedRoute element={<StudentProfileView />} />}
          />
          <Route
            path="/faculty-profile-view/:email"
            element={<ProtectedRoute element={<FacultyProfileView />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
