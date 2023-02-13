import "./App.css";
import PrimaryRouter from "./app/routers/PrimaryRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PrimaryRouter />
    </BrowserRouter>
  );
}

export default App;
