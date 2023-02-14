import PrimaryRouter from "./app/routers/PrimaryRouter";
import { BrowserRouter } from "react-router-dom";
import "./app/sass/main.scss";

function App() {
  return (
    <BrowserRouter>
      <PrimaryRouter />
    </BrowserRouter>
  );
}

export default App;
