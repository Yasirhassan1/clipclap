import { doc, getDoc, setDoc  } from "firebase/firestore";
import { getFirestore} from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
 const app = initializeApp(firebaseConfig);
 const firestore = getFirestore(app);




export async function getDataFromFireStore(documentId){
const docRef = doc(firestore, "clip", documentId);
const docSnap = await getDoc(docRef);


if (docSnap.exists()) {
  console.log("Document data:", docSnap.data().value);
  const data = docSnap.data().value
  return data;
} else {
  console.log("No such document!");
}

}

export async function storeDataInFirestore(document, inputData, documentId) {
  try {
     await setDoc(doc(firestore, document, documentId), {
      value: inputData
    });
      alert("Data saved")
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

