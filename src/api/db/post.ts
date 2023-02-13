import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

export const createGame = async (string: string) => {
 const newData = {
  pooc: string
 }
  const docRef = doc(db, "games", "5k2hgrvQvt0sTtnOn5Qm");
  await setDoc(docRef, newData, { merge: true })
  .then(() => {
    console.log("Document successfully updated!");
  })
  .catch((err) => console.log(err));
};
