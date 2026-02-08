import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import ResultDetails from "./pages/ResultDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:number" element={<Details />} />
        <Route path="/result/:date/:slot" element={<ResultDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
