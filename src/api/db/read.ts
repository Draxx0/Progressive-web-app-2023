import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { Game, Card, Cards, Rules } from "./utils";

export const getGame = async (
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
): Promise<boolean> => {
  return new Promise(resolve => {
    const documentRef = doc(db, "games", "game");
    onSnapshot(documentRef, doc => {
      console.log("GETGAME DB");
      setGame(doc.data() as Game);
      console.log('JE LOOP MEC GAME');
    });
    resolve(true);
  });
};

export const getCards = async (
  setCards: React.Dispatch<React.SetStateAction<Cards>>
): Promise<boolean> => {
  const collectionRef = collection(db, "cards");

  return new Promise(resolve => {
    onSnapshot(collectionRef, snapshot => {
      const dbCards: Cards = [];
      snapshot.forEach(doc => {
        dbCards.push({ ...doc.data(), id: doc.id } as Card);
        console.log("GETCARDS DB");
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

  return new Promise(resolve => {
    onSnapshot(documentRef, doc => {
      setRules(doc.data() as Rules);
      console.log("GETRULES DB");
    });
    resolve(true);
  });
};

// export const getPlayers = async (
//   setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
// ) => {
//   const documentRef = doc(db, "games", "game");

//   return new Promise((resolve) => {
//     onSnapshot(documentRef, (doc) => {
//       const data = doc.data();
//       const players = data?.players;
//       setPlayers(players);
//     });
//     resolve(true);
//   });
// };
