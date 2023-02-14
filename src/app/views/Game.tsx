import { useState, useEffect } from "react";
import { createGame } from "../../api/db/post";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";

const GameView = () => {
  const [game, setGame] = useState<Game | null>(null);
  const handleClick = (e: any) => {
    createGame(e.target.innerText);
  };

  useEffect(() => {
    getGame(setGame);
  }, []);
  return (
    <div className="game">
      <div
        style={{ padding: "100px", backgroundColor: "red" }}
        onClick={(e) => handleClick(e)}
      >
        Player 1
      </div>
      <div
        style={{ padding: "100px", backgroundColor: "orange" }}
        onClick={(e) => handleClick(e)}
      >
        Player 2
      </div>
      <div
        style={{ padding: "100px", backgroundColor: "green" }}
        onClick={(e) => handleClick(e)}
      >
        Player 3
      </div>
      <h1>{game && game.pooc}</h1>
    </div>
  );
};

export default GameView;
