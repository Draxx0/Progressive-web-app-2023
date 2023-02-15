import PrimaryRouter from "./app/routers/PrimaryRouter";
import { PlayerContextProvider } from "./app/contexts/playerContext";
import { BrowserRouter } from "react-router-dom";
import "./app/sass/main.scss";

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
