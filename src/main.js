
import { getDataFromFireStore, storeDataInFirestore } from "./firestoreFunctions";

const documentId = import.meta.env.VITE_DOCUMENT_ID


const form = document.getElementById("form")
const input = document.getElementById("inputt")
const saveBtn = document.getElementById("save-btn")
const loader = document.getElementsByClassName("loader")[0]

async function get(){
  const data = await getDataFromFireStore(documentId)
  input.value = data
  localStorage.setItem("data", data)
  loader.style.display = "none"
}


get() 


form.addEventListener("submit", async(e)=>{
  e.preventDefault();
  saveBtn.disabled = true;
  saveBtn.style.backgroundColor = "#0270ab"
  
  loader.style.display = "flex"
  const formData = new FormData(form)
  const data = formData.get("input")
  if(!data || localStorage.getItem("data") === data){
     loader.style.display = "none"
  saveBtn.disabled = false;
  saveBtn.style.backgroundColor = "#069ff2"
  alert("Same data provided")
     return
  }

  await storeDataInFirestore("clip", data, documentId)
  loader.style.display = "none"
  saveBtn.disabled = false;
  saveBtn.style.backgroundColor = "#069ff2"
})