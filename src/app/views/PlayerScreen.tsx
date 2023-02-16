import { useState, useEffect, useContext } from "react";

import { updateGame } from "../../api/db/post";
import { IPlayer } from "../../api/db/utils";
import Countdown from "../components/Countdown";
import RulesModal from "../components/RulesModal";
import { GameContext } from "../contexts/gameContext";
import { PlayerContext } from "../contexts/playerContext";
import MenuScreen from "./MenuScreen";

const PlayerScreen = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { game, setGame } = useContext(GameContext);
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
      updateGame({ ...game, isTotemCatch: true, isGamePause: true });
    }
  };

  const handlePutCard = () => {
    if (game) {
      console.log("test");
    }
  };

  const handleClcik = () => {
    setIsActive(!isActive);
    console.log(isActive);
    
  };

  return (
    
    <div
      className="playerScreen"
      style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')` }}
    >
      
      {username ? (
        !viewState.isFetching && (
          <>
          {isActive && (
                    <RulesModal/>
                  )
                  }
            <div>
              {viewState.playerIsAvailable ? (
                <>
                  <div className="buttons">
                    <img src="./assets/icons/rules.png" alt="rules" onClick={handleClcik} />
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
