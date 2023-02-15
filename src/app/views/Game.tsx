import { useState, useEffect, useContext } from "react";
import { createCards, createGame } from "../../api/db/post";
import { getGame, getCards } from "../../api/db/read";
import { Game, Cards } from "../../api/db/utils";

const GameView = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [cards, setCards] = useState<Cards>([]);

  useEffect(() => {
    getGame(setGame);
    getCards(setCards);
  }, []);

  useEffect(() => {
    if (cards) {
      console.log("card : ", cards);
    }
  }, [cards]);

  useEffect(() => {
    if (game) {
      console.log("game :", game);
    }
  }, [game]);
  return (
    <div
      className="game"
      style={{ backgroundImage: `url('./assets/images/game-bg.jpg')` }}
    >
      <h1>Game Screen</h1>
    </div>
  );
};

export default GameView;
