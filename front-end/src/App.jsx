import { Routes, Route } from "react-router-dom";
import Sales from "../router/SalesRouter/index.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sales />}></Route>
      </Routes>
    </>
  );
}

export default App;
