import {
  createContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";

type GameType = {
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
};

const GameContext = createContext<GameType>({
  game: null,
  setGame: () => {},
});

type IProps = {
  children: ReactNode;
};

const GameContextProvider: FC<IProps> = ({ children }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    getGame(setGame);
  }, []);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
