import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getCards, getRules } from "../../api/db/read";
import { Cards, IPlayer, Rule } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import RulesModal from "../components/RulesModal";
import { CardsContext } from "../contexts/cardsContext";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import MenuScreen from "./MenuScreen";

const PlayerScreen = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { game, setGame } = useContext(GameContext);
  const { cards } = useContext(CardsContext);
  const { player, setPlayer } = useContext(PlayerContext);
  const [username, setUsername] = useState<string>("");
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: false, // repasser à true pour que ça fonctionne
    playerIsAvailable: null,
  });

  useEffect(() => {
    if (game && game.players.length && viewState.playerIsAvailable === null) {
      console.log(game.players);
      let newPlayers = game.players;

      const playerIndex = game.players.findIndex((player: IPlayer) => {
        return !player.isReservedSlot;
      });

      if (playerIndex >= 0) {
        newPlayers[playerIndex].isReservedSlot = true;
      }

      setViewState({
        ...viewState,
        playerIsAvailable: playerIndex >= 0 ? true : false,
      });

      setPlayer(game.players[playerIndex]);

      updateGame({ ...game, players: newPlayers });
    }
  }, [game?.players]);

  // GET PLAYER SLOT
  useEffect(() => {
    if (
      game?.players &&
      viewState.playerIsAvailable != null &&
      viewState.isFetching
    ) {
      setViewState({
        ...viewState,
        isFetching: false,
      });
    }
  }, [game?.players]);

  const handleGrabTotem = () => {
    if (game) {
      const isCardShapeEmpty = game?.players.every(
        (player: IPlayer) => player.cardShape === ""
      );
      console.log("isCardShapeEmpty :", isCardShapeEmpty);

      console.log(game?.players[0].cardShape === game?.players[1].cardShape);

      const totalDiscardCards = [...game.players[0].discardCards, ...game.players[1].discardCards];

      if (game?.players[0].cardShape === game?.players[1].cardShape && !isCardShapeEmpty) {
        // ICI LES DEUX CARTES SONT IDENTIQUES DONC RECUPERER LES CARTES DE LA DEFAUSSE DU GAGNANT ET LES STOCKER DANS UN ARRAY & UN ARRAY DE LA DEFAUSSE DU PERDANT
        console.log("WIN :", totalDiscardCards);
        console.log("player :", player.playerNumber);
        
        player.cardsNumber = player.cardsNumber + totalDiscardCards.length;
        console.log("player.cardsNumber :", player.cardsNumber);
        
        // if (!game.isSameCard) {
          //   if (player.playerNumber === 1) {
            //     const discard = cards.map(card => {
              //       if (player.discardCards.includes(card.id)) {
                //         return card;
                //       }
                //       console.log("discard :", discard);
                //     });
                //   }
                // } else {
        //   console.log("isSameCard :", game.isSameCard);
        // }
      } else {
        //ICI LES DEUX CARTES SONT DIFFERENTES DONC RECUPERER LES CARTES DE LA DEFAUSSE DU PERDANT ET LES STOCKER DANS UN ARRAY & UN ARRAY DE LA DEFAUSSE DU GAGNANT
        console.log("LOSE :", totalDiscardCards);
        console.log("player :", player.playerNumber);

        player.cardsNumber = player.cardsNumber + totalDiscardCards.length;
        console.log("player.cardsNumber :", player.cardsNumber);
      }
      updateGame({ ...game, isTotemCatch: true, isGamePause: true });
    }
  };
  
  const handlePutCard = () => {
    if (game) {
      const newPlayers = game.players;

      const player1Cards = cards?.filter(
        (card) => card.cardOwner === "player 1"
      );
      const player2Cards = cards?.filter(
        (card) => card.cardOwner === "player 2"
      );

      if (player1Cards && player2Cards) {
        const currentCardIndex =
          player.playerNumber === 1
            ? Math.floor(Math.random() * player1Cards.length)
            : Math.floor(Math.random() * player2Cards.length);

        const currentCard =
          player.playerNumber === 1
            ? player1Cards[currentCardIndex]
            : player2Cards[currentCardIndex];

        if (player.playerNumber === 1) {
          newPlayers[0].card = currentCard.cardName;
          newPlayers[0].cardShape = currentCard.cardShape;
          newPlayers[0].discardCards.push(currentCard.id);
          newPlayers[0].cardsNumber = newPlayers[0].cardsNumber - 1;
        } else {
          newPlayers[1].card = currentCard.cardName;
          newPlayers[1].cardShape = currentCard.cardShape;
          newPlayers[1].discardCards.push(currentCard.id);
          newPlayers[1].cardsNumber = newPlayers[1].cardsNumber - 1;
        }

        updateGame({
          ...game,
          playerTurn: game?.playerTurn === 1 ? 2 : 1,
          players: newPlayers,
        });
      }
    }
  };

  return (
    
    <div
      className="playerScreen"
      style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')` }}
    >
      {username ? (
        !viewState.isFetching && (
          <>
            <RulesModal isActive={isActive}/>
            <div>
              {viewState.playerIsAvailable ? (
                <>
                  <div className="buttons">
                    <img src="./assets/icons/rules.png" alt="rules" onClick={() => setIsActive(!isActive)} />
                    <img src="./assets/icons/sound.png" alt="sound" />
                  </div>

                  <div className="cooldown">
                    <img src="./assets/images/Sign.png" alt="sign" />
                    <Countdown />
                  </div>
                  <div className="interactions">
                    <div className="grab-button">
                      <img
                        src="./assets/images/grab.png"
                        alt="grab"
                        onClick={handleGrabTotem}
                      />
                    </div>
                    <div className="card">
                      <img
                        src="./assets/images/back-card.png"
                        alt="card"
                        style={{
                          filter:
                            player.playerNumber !== game?.playerTurn
                              ? "brightness(0.5)"
                              : "initial",
                        }}
                        onClick={
                          player.playerNumber === game?.playerTurn
                            ? handlePutCard
                            : () => {}
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p>La salle est pleine</p>
              )}
            </div>
          </>
        )
      ) : (
        <MenuScreen username={username} setUsername={setUsername} />
      )}
    </div>
  );
};

export default PlayerScreen;
