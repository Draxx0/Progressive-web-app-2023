import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "../services/firebase.config";
import cards from "../../app/data/cards.json";
import { IPlayer } from "./utils";

export const createGame = async (string: string) => {
  const newData = {
    pooc: string,
  };
  const docRef = doc(db, "games", "5k2hgrvQvt0sTtnOn5Qm");
  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((err) => console.log(err));
};

export const createCards = async () => {
  const batch = writeBatch(db);
  cards.forEach((card) => {
    const docRef = doc(collection(db, "cards"));
    batch.set(docRef, card);
  });
  await batch.commit().then(() => {
    console.log("Document successfully updated!");
  });
};

export const reserveGameSlot = async (players: IPlayer[]) => {
  const docRef = doc(db, "games", "game");
  console.log(players);
  
  const newData = {
    players: players,
  };

  await setDoc(docRef, newData, { merge: true })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((err) => console.log(err));
};
