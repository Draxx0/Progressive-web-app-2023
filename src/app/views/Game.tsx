import { useState, useEffect, useContext } from "react";
import { createCards, createGame, updateCards, updateGame } from "../../api/db/post";
import { getCards } from "../../api/db/read";
import { Cards } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import splitArray from "../functions/splitArray";

const GameView = () => {
  const [cards, setCards] = useState<Cards>([]);
  const { game, setGame } = useContext(GameContext);

  useEffect(() => {
    // getCards(setCards);
    // createGame();
    // createCards();
  }, []);

  useEffect(() => {
    if (game) {
      const readyToPlay = game.players.filter(player => player.isReservedSlot === true);
      if (readyToPlay.length === 2 && cards) {
        const splitedCards = splitArray(cards);

        const newPlayers = game.players.map(player => {
          if (player.playerNumber === 1) {
            player.cardsNumber = splitedCards[0].length;
          } else if (player.playerNumber === 2) {
            player.cardsNumber = splitedCards[1].length;
          }
          return player;
        });

        const cardsOwner = cards.map(card => {
          if (splitedCards[0].includes(card)) {
            card.cardOwner = "player 1";
          } else if (splitedCards[1].includes(card)) {
            card.cardOwner = "player 2";
          } else {
            card.cardOwner = "discard";
          }
          return card;
        });

        // updateGame({ ...game, players: newPlayers });
        // updateCards(cardsOwner);
      }
    }
  }, [game?.players]);

  return (
    <div
      className="game"
      style={{
        backgroundImage: `url('./assets/images/game-bg.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}>
      <div className="gameboard">
        {game?.isTotemCatch && <p className="catch">Catch ! </p>}
        <div className="left-player">
          <div className="player-cards">
            <p className="player-cards__playerName">{game?.players[0].playerName}</p>
            <p className="player-cards__cardsNumber">
              {game?.players[0].cardsNumber} carte(s) restantes
            </p>
            <img
              src={
                !game?.players[0].card
                  ? "/assets/images/back-card.png"
                  : `/assets/images/cards/${game?.players[0].card}.png`
              }
              alt=""
              className="player-cards__image"
            />
          </div>
        </div>
        <div className="totem">
          <img
            src={"/assets/images/totem.png"}
            alt=""
            className={game?.isTotemCatch ? "totem__image-hide" : "totem__image"}
          />
        </div>
        <div className="right-player">
          <div className="player-cards">
            <p className="player-cards__playername"> {game?.players[1].playerName}</p>
            <p className="player-cards__cardsNumber">
              {game?.players[1].cardsNumber} carte(s) restantes
            </p>
            <img
              src={
                !game?.players[1].card
                  ? "/assets/images/back-card.png"
                  : `/assets/images/cards/${game?.players[1].card}.png`
              }
              alt=""
              className="player-cards__image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
