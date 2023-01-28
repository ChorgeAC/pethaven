import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, About, Error } from "./pages";

export const config = {
  endpoint: `http://localhost:5000`,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
