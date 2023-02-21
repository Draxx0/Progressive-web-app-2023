import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { IPlayer } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import RulesModal from "../components/RulesModal";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import MenuScreen from "../components/MenuScreen";

const PlayerScreen = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { game } = useContext(GameContext);
  const { player, setPlayer } = useContext(PlayerContext);
  const [totemIsClicked, setTotemIsClicked] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: false,
    playerIsAvailable: null,
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
      setTotemIsClicked(true);
      updateGame({
        ...game,
        isTotemCatch: `player ${player.playerNumber}`,
        isGamePause: true,
      });
    }
  };

  useEffect(() => {
    if (game?.isTotemCatch === "") {
      setTotemIsClicked(false);
    } else {
      setTotemIsClicked(true);
    }
  }, [game?.isTotemCatch]);

  const changeCardNumber = () => {
    if (game && game.isTotemCatch === "") {
      const newPlayers = game.players;
      if (player.playerNumber === 1) {
        newPlayers[0].cardsNumber = newPlayers[0].cardsNumber - 1;
      } else {
        newPlayers[1].cardsNumber = newPlayers[1].cardsNumber - 1;
      }

      updateGame({
        ...game,
        players: newPlayers,
      });
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
            <RulesModal isActive={isActive} />
            <div>
              {viewState.playerIsAvailable ? (
                <>
                  <div>
                    {game?.players[0].isReservedSlot === true &&
                    game?.players[1].isReservedSlot === true ? (
                      <>
                        <div className="buttons">
                          <img
                            src="./assets/icons/rules.png"
                            alt="rules"
                            onClick={() => setIsActive(!isActive)}
                          />
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
                              style={{
                                filter: totemIsClicked
                                  ? "brightness(0.5)"
                                  : "initial",
                              }}
                              onClick={
                                !totemIsClicked
                                  ? () => handleGrabTotem()
                                  : () => {}
                              }
                            />
                          </div>
                          <div className="card">
                            {
                              <img
                                src="./assets/images/back-card.png"
                                alt="card"
                                style={{
                                  filter:
                                    player.playerNumber !== game?.playerTurn ||
                                    totemIsClicked
                                      ? "brightness(0.5)"
                                      : "initial",
                                }}
                                onClick={
                                  player.playerNumber === game?.playerTurn ||
                                  totemIsClicked
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
                  <p className="full">
                    Veuillez patienter une partie est en cours
                  </p>
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
