import PrimaryRouter from "./app/routers/PrimaryRouter";
import { BrowserRouter } from "react-router-dom";
import "./app/sass/main.scss";
import { PlayerContextProvider } from "./app/contexts/playerContext";

function App() {
  return (
    <PlayerContextProvider>
      <BrowserRouter>
        <PrimaryRouter />
      </BrowserRouter>
    </PlayerContextProvider>
  );
}

export default App;
