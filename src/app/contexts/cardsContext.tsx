import {
  createContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { getCards } from "../../api/db/read";
import { Cards } from "../../api/db/utils";

type CardsType = {
  cards: Cards | null;
  setCards: Dispatch<SetStateAction<Cards>>;
};

const CardsContext = createContext<CardsType>({
  cards: null,
  setCards: () => {},
});

type IProps = {
  children: ReactNode;
};

const CardsContextProvider: FC<IProps> = ({ children }) => {
  const [cards, setCards] = useState<Cards>([]);

  useEffect(() => {
    getCards(setCards);
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export { CardsContextProvider, CardsContext };
