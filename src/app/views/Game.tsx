import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getCards } from "../../api/db/read";
import { Cards, IPlayer } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import splitArray from "../functions/splitArray";

const GameView = () => {
  const [cards, setCards] = useState<Cards>([]);
  const { game, setGame } = useContext(GameContext);

  useEffect(() => {
    getCards(setCards);
  }, []);

  useEffect(() => {
    if (cards) {
      console.log("card : ", cards);
    }
  }, [cards]);

  useEffect(() => {
    if (game) {
      const readyToPlay = game.players.filter(
        (player) => player.isReservedSlot === true
      );
      if (readyToPlay.length === 2 && cards) {
        const splitedCards = splitArray(cards);

        const newPlayers = game.players.map((player) => {
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

        updateGame({ ...game, players: newPlayers });
      }
    }
  }, [game?.players, cards]);

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
