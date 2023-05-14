import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Error,
  Login,
  Register,
  Admin,
  PetInfo,
  SinglePet,
} from "./pages";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const config = {
  endpoint: `http://localhost:5000`,
};

function App() {
  const { token } = useSelector((store) => store.auth);
  let isAdmin;
  if (token) {
    isAdmin = jwt_decode(token).isAdmin;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/pet/:id" element={<SinglePet />}></Route>
        {isAdmin && <Route path="/admin" element={<Admin />}></Route>}
        {isAdmin && <Route path="/petInfo" element={<PetInfo />}></Route>}
        {isAdmin && <Route path="/petInfo/:id" element={<PetInfo />}></Route>}
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
