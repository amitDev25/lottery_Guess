import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import ResultDetails from "./pages/ResultDetails";
import Rank from "./pages/Rank";
import Compare from "./pages/Compare";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:number" element={<Details />} />
        <Route path="/result/:date/:slot" element={<ResultDetails />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
