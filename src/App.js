import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/student-profile" element={<StudentProfile/>}></Route>
          <Route path="/notifications" element={<Notifications/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
