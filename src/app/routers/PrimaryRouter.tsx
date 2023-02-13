import { Routes, Route } from "react-router-dom";
import GameView from "../views/Game";

const PrimaryRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GameView />} />
    </Routes>
  );
};

export default PrimaryRouter;
