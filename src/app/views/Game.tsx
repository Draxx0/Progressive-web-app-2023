import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateCards, updateGame, updateRules } from "../../api/db/post";
import { getCards, getRules } from "../../api/db/read";
import { Cards, IPlayer } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";
import shuffleArrays from "../functions/randomizeArrayItem";
import splitArray from "../functions/splitArray";

const GameView = () => {
  const { game } = useContext(GameContext);
  const [cards, setCards] = useState<Cards>([]);
  const [isGameCreated, setIsGameCreated] = useState(false);
  const maxCardsByPlayer = 24;
  const [roundWinner, setRoundWinner] = useState<IPlayer | null>(null);
  const navigate = useNavigate();
  const [rules, setRules] = useState<any>({});

  // GET CARD ONLY ONCE
  useEffect(() => {
    getCards(setCards);
  }, []);

  useEffect(() => {
    getRules(setRules);
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

        updateGame({ ...game, players: newPlayers, isGameActive: true });
        updateCards(cardsOwner);
        setIsGameCreated(true);
      }
    }
  }, [game?.players]);

  //SHUFFLE CARDS IF CARDSNUMBER IS 0 AND DISCARDS IS NOT EMPTY
  useEffect(() => {
    if (game) {
      if (
        game?.players[0].cardsNumber === 0 &&
        game?.players[1].cardsNumber === 0 &&
        game?.players[0].discardCards.length > 0 &&
        game?.players[1].discardCards.length > 0
      ) {
        const playerCards1 = cards.filter(
          (card) => card.cardOwner === "player 1"
        );
        const playerCards2 = cards.filter(
          (card) => card.cardOwner === "player 2"
        );

        const shuffledArrays = shuffleArrays(playerCards1, playerCards2);

        const newPlayers = game.players.map((player) => {
          if (player.playerNumber === 1) {
            player.cardsNumber = shuffledArrays[0].length;
            player.discardCards = [];
          } else if (player.playerNumber === 2) {
            player.cardsNumber = shuffledArrays[1].length;
            player.discardCards = [];
          }
          return player;
        });

        updateGame({ ...game, players: newPlayers });
      }
    }
  }, [game?.players]);

  // IF PLAYER DOESN'T PLAY IN TIME PUT A CARD FOR HIM
  useEffect(() => {
    if (game && rules?.isTimeout === true) {
      const newPlayers = game.players;

      if (game?.playerTurn === 1) {
        newPlayers[0].cardsNumber = newPlayers[0].cardsNumber - 1;
        updateGame({ ...game, players: newPlayers });
        handlePutCard(0);
        updateRules({ ...rules, isTimeout: false });
      } else {
        newPlayers[1].cardsNumber = newPlayers[1].cardsNumber - 1;
        updateGame({ ...game, players: newPlayers });
        handlePutCard(1);
        updateRules({ ...rules, isTimeout: false });
      }
    }
  }, [rules?.isTimeout]);

  // PUT CARD FOR PLAYER 0
  useEffect(() => {
    if (
      game &&
      isGameCreated &&
      game?.players[0].cardsNumber != maxCardsByPlayer &&
      game?.playerTurn === 1 &&
      game.isTotemCatch === ""
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
      game?.playerTurn === 2 &&
      game.isTotemCatch === ""
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

      updateRules({
        ...rules,
        isRulesChange: rules?.isRulesChange === true ? false : true,
      });
      updateGame({
        ...game,
        playerTurn: game?.playerTurn === 1 ? 2 : 1,
        players: newPlayers,
      });
    }
  };

  useEffect(() => {
    if (
      game?.players[0].cardsNumber === 0 &&
      game?.players[0].discardCards.length > 0
    ) {
      updateGame({ ...game, playerTurn: 2 });
    } else if (
      game?.players[1].cardsNumber === 0 &&
      game?.players[1].discardCards.length > 0
    ) {
      updateGame({ ...game, playerTurn: 1 });
    }
  }, [game?.players]);

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

      // WININING CONDITION
      if (
        game?.players[0].cardShape === game?.players[1].cardShape &&
        !isCardShapeEmpty
      ) {
        const newCardsOwner = discardCards.map((card) => {
          const newCard = {
            ...card,
            cardOwner:
              game?.isTotemCatch === "player 1" ? "player 2" : "player 1",
          };
          return newCard;
        });

        const playerIndex = game?.isTotemCatch === "player 1" ? 1 : 0;

        newPlayers[playerIndex].cardsNumber =
          newPlayers[playerIndex].cardsNumber + totalDiscardCards.length;

        newPlayers.forEach((player) => {
          player.discardCards = [];
        });

        setRoundWinner(newPlayers[game?.isTotemCatch === "player 1" ? 0 : 1]);

        updateGame({ ...game, players: newPlayers });
        updateCards(newCardsOwner);
      } else {
        const newCardsOwner = discardCards.map((card) => {
          const newCard = {
            ...card,
            cardOwner: game?.isTotemCatch,
          };
          return newCard;
        });

        const playerIndex = +game?.isTotemCatch.slice(-1);

        newPlayers[playerIndex - 1].cardsNumber =
          newPlayers[playerIndex - 1].cardsNumber + totalDiscardCards.length;

        newPlayers.forEach((player) => {
          player.discardCards = [];
        });

        setRoundWinner(newPlayers[game?.isTotemCatch === "player 1" ? 1 : 0]);

        updateGame({ ...game, players: newPlayers });
        updateCards(newCardsOwner);
      }

      newPlayers.forEach((player) => {
        player.card = "";
        player.cardShape = "";
      });

      setTimeout(() => {
        updateGame({
          ...game,
          players: newPlayers,
          isTotemCatch: "",
          isGamePause: false,
        });
      }, 5000);
    }
  };

  useEffect(() => {
    if (game && game?.winner) {
      setTimeout(() => {
        navigate("/endgame");
      }, 5000);
    }
  }, [game?.winner]);

  // WIN CONDITION
  useEffect(() => {
    if (game) {
      const newGame = game;
      if (
        game?.players[0].cardsNumber === 0 &&
        game?.players[0].discardCards.length === 0
      ) {
        newGame.winner = game?.players[0].playerName;
        updateGame({ ...game, isGameActive: false });
      } else if (
        game?.players[1].cardsNumber === 0 &&
        game?.players[1].discardCards.length === 0
      ) {
        newGame.winner = game?.players[1].playerName;
        updateGame({ ...game, isGameActive: false });
      }
    }
  }, [
    game?.players[0].cardsNumber,
    game?.players[1].cardsNumber,
    game?.players[0].discardCards.length,
    game?.players[1].discardCards.length,
  ]);

  const resetPlayers = () => {
    if (game) {
      const newPlayers = game?.players.map((player) => {
        return {
          ...player,
          card: "",
          cardShape: "",
          discardCards: [],
          cardsNumber: 24,
          isReservedSlot: false,
          playerName: "",
        };
      });
      setIsGameCreated(false);
      updateGame({
        ...game,
        isGameActive: false,
        players: newPlayers,
        winner: "",
      });
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
        {game?.winner && (
          <p
            className="winner"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "2rem",
              color: "white",
            }}
          >
            Le gagnant est : {game?.winner}{" "}
          </p>
        )}
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
            <p className="player-cards__cardsNumber">
              {game?.players[0].discardCards.length} carte(s) en d??fausse
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
            <p className="player-cards__cardsNumber">
              {game?.players[1].discardCards.length} carte(s) en d??fausse
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
      <div
        onClick={resetPlayers}
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "white",
          cursor: "pointer",
        }}
      >
        Reset
      </div>
    </div>
  );
};

export default GameView;
