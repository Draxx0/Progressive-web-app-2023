import { useState, useEffect, useContext } from "react";
import { createCards, createGame } from "../../api/db/post";
import { getGame, getCards, getPlayers } from "../../api/db/read";
import { Game, Cards, IPlayer } from "../../api/db/utils";
import splitArray from "../functions/splitArray";

const GameView = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [cards, setCards] = useState<Cards>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    getGame(setGame);
    getCards(setCards);
    getPlayers(setPlayers);
  }, []);

  console.log("players : ", players);

  useEffect(() => {
    if (cards) {
      console.log("card : ", cards);
    }
  }, [cards]);

  useEffect(() => {
    const readyToPlay = players.filter(
      (player) => player.isReservedSlot === true
    );
    if (readyToPlay.length === 2 && cards) {
      const splitedCards = splitArray(cards);

      const newPlayers = players.map((player) => {
        if (player.playerNumber === 1) {
          player.cardsNumber = splitedCards[0].length;
        } else if (player.playerNumber === 2) {
          player.cardsNumber = splitedCards[1].length;
        }
        return player;
      });

      const cardsOwner = cards.map((card) => {
        if (splitedCards[0].includes(card)) {
          card.cardOwner = "player 1";
        } else if (splitedCards[1].includes(card)) {
          card.cardOwner = "player 2";
        } else {
          card.cardOwner = "discard";
        }

        return card;
      });
      console.log("cardsOwner : ", cardsOwner);

      console.log("newPlayers : ", newPlayers);


    }
  }, [players, cards]);

  return (
    <div
      className="game"
      style={{
        backgroundImage: `url('./assets/images/game-bg.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="gameboard">
        <div className="left-player">
          <div className="player-cards">
            <img src="" alt="" className="player-cards__image" />
          </div>
        </div>
        <div className="totem">
          <img
            src={"/assets/images/totem.png"}
            alt=""
            className="totem__image"
          />
        </div>
        <div className="right-player">
          <div className="player-cards">
            <img src="" alt="" className="player-cards__image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
