import { Routes, Route } from "react-router-dom";
import GameView from "../views/Game";
import MenuScreen from "../views/MenuScreen";
import PlayerScreen from "../views/PlayerScreen";

const PrimaryRouter = () => {
  return (
    <Routes>
      <Route path="/game" element={<GameView />} />
      <Route path="/" element={<PlayerScreen />} />
    </Routes>
  );
};

export default PrimaryRouter;
