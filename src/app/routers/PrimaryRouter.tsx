import { Routes, Route } from "react-router-dom";
import GameView from "../views/Game";
import MenuScreen from "../views/MenuScreen";
import PlayerScreen from "../views/PlayerScreen";

const PrimaryRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuScreen />} />
      <Route path="/game" element={<GameView />} />
      <Route path="/player1" element={<PlayerScreen />} />
      <Route path="/player2" element={<PlayerScreen />} />
    </Routes>
  );
};

export default PrimaryRouter;
