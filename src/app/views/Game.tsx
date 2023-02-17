import { useState, useEffect, useContext } from "react";
import {
  createCards,
  createGame,
  updateCards,
  updateGame,
} from "../../api/db/post";
import { getCards } from "../../api/db/read";
import { Cards, IPlayer } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import splitArray from "../functions/splitArray";

const GameView = () => {
  const { game, setGame } = useContext(GameContext);
  const [cards, setCards] = useState<Cards>([]);
  const { player } = useContext(PlayerContext);
  const [isGameCreated, setIsGameCreated] = useState(false);
  const maxCardsByPlayer = 24;
  const [roundWinner, setRoundWinner] = useState<IPlayer | null>(null);
  // const {cards} = useContext(CardsContext);

  // GET CARD ONLY ONCE
  useEffect(() => {
    getCards(setCards);
  }, []);

  // REPARTITION DES CARTES
  useEffect(() => {
    if (game) {
      const readyToPlay = game.players.filter(
        (player) => player.isReservedSlot === true
      );
      if (readyToPlay.length === 2 && cards && !isGameCreated) {
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
        updateCards(cardsOwner);
        setIsGameCreated(true);
      }
    }
  }, [game?.players]);

  // PUT CARD FOR PLAYER 0
  useEffect(() => {
    if (
      game &&
      isGameCreated &&
      game?.players[0].cardsNumber != maxCardsByPlayer &&
      game?.playerTurn === 1
    ) {
      handlePutCard(0);
    }
  }, [game?.players[0].cardsNumber]);

  // PUT CARD FOR PLAYER 1
  useEffect(() => {
    if (
      game &&
      isGameCreated &&
      game?.players[1].cardsNumber != maxCardsByPlayer &&
      game?.playerTurn === 2
    ) {
      handlePutCard(1);
    }
  }, [game?.players[1].cardsNumber]);

  // PUT CARD AND CHANGE PLAYER TURN
  const handlePutCard = (playerIndex: 0 | 1) => {
    if (game) {
      const newPlayers = game.players;

      const playerCardsByOwner = cards?.filter(
        (card) => card.cardOwner === `player ${playerIndex + 1}`
      );

      if (playerCardsByOwner) {
        const currentCard =
          playerCardsByOwner[
            Math.floor(Math.random() * playerCardsByOwner.length)
          ];

        newPlayers[playerIndex].card = currentCard.cardName;
        newPlayers[playerIndex].cardShape = currentCard.cardShape;
        newPlayers[playerIndex].discardCards.push(currentCard.id);
      }

      updateGame({
        ...game,
        playerTurn: game?.playerTurn === 1 ? 2 : 1,
        players: newPlayers,
      });
    }
  };

  useEffect(() => {
    if (game && game?.isTotemCatch) {
      handleCatchTotem();
    }
  }, [game?.isTotemCatch]);

  const handleCatchTotem = () => {
    if (game) {
      const newPlayers = game.players;

      const isCardShapeEmpty = game?.players.every(
        (player: IPlayer) => player.cardShape === ""
      );

      const totalDiscardCards = [
        ...game.players[0].discardCards,
        ...game.players[1].discardCards,
      ];

      if (
        game?.players[0].cardShape === game?.players[1].cardShape &&
        !isCardShapeEmpty
      ) {
        // ICI LES DEUX CARTES SONT IDENTIQUES DONC RECUPERER LES CARTES DE LA DEFAUSSE DU GAGNANT ET LES STOCKER DANS UN ARRAY & UN ARRAY DE LA DEFAUSSE DU PERDANT
        console.log("WIN :", totalDiscardCards);
        console.log("player :", player.playerNumber);
      } else {
        console.log("LOSE :", totalDiscardCards);
        // player.cardsNumber = player.cardsNumber + totalDiscardCards.length;

        const discardCardsId = totalDiscardCards.map((cardId: string) => {
          return cardId;
        });

        const discardCards = cards.filter((card) => {
          if (discardCardsId.includes(card.id)) {
            return card;
          } else {
            return false;
          }
        });

        const newCardsOwner = discardCards.map((card) => {
          const newCard = {
            ...card,
            cardOwner: game?.isTotemCatch,
          };
          return newCard;
        });

        console.log("mes super cartes :", newCardsOwner);

        const playerIndex = +game?.isTotemCatch.slice(-1);

        console.log(newPlayers[playerIndex - 1].cardsNumber);

        newPlayers[playerIndex - 1].cardsNumber =
          newPlayers[playerIndex - 1].cardsNumber + totalDiscardCards.length;

        newPlayers.forEach((player) => {
          player.discardCards = [];
        });

        setRoundWinner(newPlayers[game?.isTotemCatch === "player 1" ? 1 : 0]);
        // updateGame({ ...game, players: newPlayers });
        // updateCards(newCardsOwner);

        // EXPECTED RESULT : [ { id: '', cardShape: '', cardColor: '', cardName: '', cardOwner: ''}, ... ]
      }
      // updateGame({ ...game, isTotemCatch: true, isGamePause: true });
    }
  };

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
        {game?.isTotemCatch && (
          <p className="catch">
            Catch ! Le gagnant de ce round : {roundWinner?.playerName}{" "}
          </p>
        )}
        <div className="left-player">
          <div className="player-cards">
            <p className="player-cards__playerName">
              {game?.players[0].playerName}
            </p>
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
            className={
              game?.isTotemCatch ? "totem__image-hide" : "totem__image"
            }
          />
        </div>
        <div className="right-player">
          <div className="player-cards">
            <p className="player-cards__playerName">
              {" "}
              {game?.players[1].playerName}
            </p>
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
