import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { Game, Card, Cards, Rules } from "./utils";

export const getGame = async (
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
): Promise<boolean> => {
  return new Promise((resolve) => {
    const documentRef = doc(db, "games", "game");
    onSnapshot(documentRef, (doc) => {
      setGame(doc.data() as Game);
    });
    resolve(true);
  });
};

export const getCards = async (
  setCards: React.Dispatch<React.SetStateAction<Cards>>
): Promise<boolean> => {
  const collectionRef = collection(db, "cards");

  return new Promise((resolve) => {
    onSnapshot(collectionRef, (snapshot) => {
      const dbCards: Cards = [];
      snapshot.forEach((doc) => {
        dbCards.push({ ...doc.data(), id: doc.id } as Card);
        setCards(dbCards);
      });
      resolve(true);
    });
  });
};

export const getRules = async (
  setRules: React.Dispatch<React.SetStateAction<Rules>>
): Promise<boolean> => {
  const documentRef = doc(db, "rules", "rules");

  return new Promise((resolve) => {
    onSnapshot(documentRef, (doc) => {
      setRules(doc.data() as Rules);
    });
    resolve(true);
  });
};
