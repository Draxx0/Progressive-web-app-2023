import PrimaryRouter from "./app/routers/PrimaryRouter";
import { PlayerContextProvider } from "./app/contexts/playerContext";
import { BrowserRouter } from "react-router-dom";
import "./app/sass/main.scss";
import { GameContextProvider } from "./app/contexts/gameContext";

function App() {
  return (
    <GameContextProvider>
      <PlayerContextProvider>
        <BrowserRouter>
          <PrimaryRouter />
        </BrowserRouter>
      </PlayerContextProvider>
    </GameContextProvider>
  );
}

export default App;
