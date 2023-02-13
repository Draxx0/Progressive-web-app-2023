import { useState, useEffect } from "react";
import { createGame } from "../../api/db/post";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";

const GameView = () => {
  const [string, setString] = useState<string>("");
  const [game, setGame] = useState<Game | null>(null);
  const handleClick = (e: any) => {
    setString(e.target.innerText);
    console.log("click", e.target.innerText);
    console.log("string", string);
  };

  useEffect(() => {
    if (string.length !== 0) {
      createGame(string);
    }
    // console.log(string);
  }, [string]);

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
      <h1>{game && game.pooc}</h1>
    </div>
  );
};

export default GameView;
