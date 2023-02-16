import { useState, useEffect, useContext } from "react";
import { updateGame } from "../../api/db/post";
import { getRules } from "../../api/db/read";
import { IPlayer, Rules } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import MenuScreen from "./MenuScreen";

const PlayerScreen = () => {
  const [rules, setRules] = useState<Rules>([]);
  const { game, setGame } = useContext(GameContext);
  const { player, setPlayer } = useContext(PlayerContext);
  const [username, setUsername] = useState<string>("");
  const [viewState, setViewState] = useState<{
    isFetching: boolean;
    playerIsAvailable: null | boolean;
  }>({
    isFetching: false, // repasser à true pour que ça fonctionne
    playerIsAvailable: null
  });

  useEffect(() => {
    getRules(setRules);
  }, []);

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
      console.log("isCardShapeEmpty :", isCardShapeEmpty);

      if (game?.players[0].cardShape === game?.players[1].cardShape && !isCardShapeEmpty) {
        game.isSameCard = true;
        console.log("isSameCard :", game.isSameCard);
      } else {
        game.isSameCard = false;
        console.log("isSameCard :", game.isSameCard);
      }
      updateGame({ ...game, isTotemCatch: true, isGamePause: true, isSameCard: game.isSameCard });
    }
  };

  const handlePutCard = () => {
    if (game) {
      console.log("test");
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
                      <img src="./assets/images/grab.png" alt="grab" onClick={handleGrabTotem} />
                    </div>
                    <div className="card">
                      <img
                        src="./assets/images/back-card.png"
                        alt="card"
                        style={{
                          filter:
                            player.playerNumber !== game?.playerTurn ? "brightness(0.5)" : "initial"
                        }}
                        onClick={
                          player.playerNumber === game?.playerTurn ? handlePutCard : () => {}
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
