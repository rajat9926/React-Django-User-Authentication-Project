import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/HomePage";
import Contact from "./components/pages/ContactPage";
import Loginreg from "./components/pages/authpage/LoginRegPage";
import PasswordReset from "./components/pages/authpage/PasswordReset";
import Resetpass from "./components/pages/authpage/Resetpass";
import Dashboard from "./components/pages/Dashboard";
import { useSelector } from "react-redux";


function App() {
  const { access_token } = useSelector(state => state.auth)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="loginregpage" element={!access_token ? <Loginreg/> : <Navigate to="/dashboard"/>} />
            <Route path="resetpassword" element={<PasswordReset/>} />
            <Route path="api/resetpassword/:uid/:token" element={<Resetpass/>} />
          </Route>
          <Route path="/dashboard" element={access_token ? <Dashboard/> : <Navigate to="/loginregpage"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}





export default App;
