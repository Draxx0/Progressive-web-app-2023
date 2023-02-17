import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getRules } from "../../api/db/read";
import { Cards, IPlayer, Rules } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import MenuScreen from "./MenuScreen";

const PlayerScreen = () => {
  const { game, setGame } = useContext(GameContext);
  // const [cards, setCards] = useState<Cards>([]);
  const { player, setPlayer } = useContext(PlayerContext);
  const [username, setUsername] = useState<string>("");
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: false,
    playerIsAvailable: null
  });

  // SET PLAYER SLOT AVAILABLE
  useEffect(() => {
    if (game && game.players.length && viewState.playerIsAvailable === null) {
      let newPlayers = game.players;

      const playerIndex = game.players.findIndex((player: IPlayer) => {
        return !player.isReservedSlot;
      });

      if (playerIndex >= 0) {
        newPlayers[playerIndex].isReservedSlot = true;
      }

      setViewState({
        ...viewState,
        playerIsAvailable: playerIndex >= 0 ? true : false
      });

      setPlayer(game.players[playerIndex]);

      updateGame({ ...game, players: newPlayers });
    }
  }, [game?.players]);

  // GET PLAYER SLOT
  useEffect(() => {
    if (game?.players && viewState.playerIsAvailable != null && viewState.isFetching) {
      setViewState({
        ...viewState,
        isFetching: false
      });
    }
  }, [game?.players]);

  const handleGrabTotem = () => {
    if (game) {
      const isCardShapeEmpty = game?.players.every((player: IPlayer) => player.cardShape === "");

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
      // updateGame({ ...game, isTotemCatch: true, isGamePause: true });
    }
  };

  // UPDATE CARD NUMBER & PLAYER TURN
  const changeCardNumber = () => {
    if (game) {
      const newPlayers = game.players;

      if (player.playerNumber === 1) {
        newPlayers[0].cardsNumber = newPlayers[0].cardsNumber - 1;
      } else {
        newPlayers[1].cardsNumber = newPlayers[1].cardsNumber - 1;
      }

      updateGame({
        ...game,
        players: newPlayers
      });
    }
  };

  return (
    <div
      className="playerScreen"
      style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')` }}>
      {username ? (
        !viewState.isFetching && (
          <>
            <div>
              {viewState.playerIsAvailable ? (
                <>
                  <div>
                    {game?.players[0].isReservedSlot === true &&
                    game?.players[1].isReservedSlot === true ? (
                      <>
                        <div className="buttons">
                          <img src="./assets/icons/rules.png" alt="rules" />
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
                            {
                              <img
                                src="./assets/images/back-card.png"
                                alt="card"
                                style={{
                                  filter:
                                    player.playerNumber !== game?.playerTurn
                                      ? "brightness(0.5)"
                                      : "initial"
                                }}
                                onClick={
                                  player.playerNumber === game?.playerTurn
                                    ? () => changeCardNumber()
                                    : () => {}
                                }
                              />
                            }
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="waitingRoom">
                        <div className="waitingContainer">
                          <p className="wait">En attente d'un autre joueur</p>
                          {/* <img src="./assets/icons/loading.gif" alt="loading" /> */}
                          <section className="loading-data">
                            <h2 className="loading-text text-center text-uppercase">
                              <span className="char">C</span>
                              <span className="char">h</span>
                              <span className="char">a</span>
                              <span className="char">r</span>
                              <span className="char">g</span>
                              <span className="char">e</span>
                              <span className="char">m</span>
                              <span className="char">e</span>
                              <span className="char">n</span>
                              <span className="char">t</span>
                            </h2>
                          </section>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="fullContainer">
                  <img src="./assets/images/Sign.png" alt="sign" />
                  <img
                    className="reboot"
                    src="./assets/icons/reboot-icon.png"
                    alt="reboot"
                    onClick={() => {
                      window.location.reload();
                    }}
                  />
                  <p className="full">Veuillez patienter une partie est en cours</p>
                </div>
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
