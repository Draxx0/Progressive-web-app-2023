import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { Game } from "./utils";

// GET ALL ZONES IN LIVE RELOAD
// export const getGames = async (): Promise<boolean> => {
//   const collectionRef = collection(db, "games");

//   return new Promise((resolve) => {
//     onSnapshot(collectionRef, (snapshot) => {
//       const dbGames: Games = [];
//       snapshot.forEach((doc) => {
//         dbGames.push({ ...doc.data(), id: doc.id } as Game);
//       });
//       resolve(true);
//     });
//   });
// };

export const getGame = async (
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
): Promise<boolean> => {
  return new Promise((resolve) => {
    const documentRef = doc(db, "games", "5k2hgrvQvt0sTtnOn5Qm");
    onSnapshot(documentRef, (doc) => {
      setGame(doc.data() as Game);
      console.log(doc.data());
    });
    resolve(true);
  });
};
