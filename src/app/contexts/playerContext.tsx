import {
  createContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { IPlayer, playerDefault } from "../../api/db/utils";

type Player = {
  player: IPlayer;
  setPlayer: Dispatch<SetStateAction<IPlayer>>;
};

const PlayerContext = createContext<Player>({
  player: playerDefault,
  setPlayer: () => {},
});

type IProps = {
  children: ReactNode;
};

const PlayerContextProvider: FC<IProps> = ({ children }) => {
  const [player, setPlayer] = useState<IPlayer>(playerDefault);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContextProvider, PlayerContext };
