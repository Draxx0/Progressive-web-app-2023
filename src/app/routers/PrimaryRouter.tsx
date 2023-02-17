import { Routes, Route } from "react-router-dom";
import EndGame from "../views/EndGame";
import GameView from "../views/Game";
import PlayerScreen from "../views/PlayerScreen";

const PrimaryRouter = () => {
  return (
    <Routes>
      <Route path="/game" element={<GameView />} />
      <Route path="/" element={<PlayerScreen />} />
      <Route path="/endgame" element={<EndGame />} />
    </Routes>
  );
};

export default PrimaryRouter;
