import PrimaryRouter from "./app/routers/PrimaryRouter";
import { PlayerContextProvider } from "./app/contexts/playerContext";
import { BrowserRouter } from "react-router-dom";
import "./app/sass/main.scss";
import { GameContextProvider } from "./app/contexts/gameContext";
import { CardsContextProvider } from "./app/contexts/cardsContext";

function App() {
  return (
    <CardsContextProvider>
      <GameContextProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <PrimaryRouter />
          </BrowserRouter>
        </PlayerContextProvider>
      </GameContextProvider>
    </CardsContextProvider>
  );
}

export default App;
