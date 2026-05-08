import { db } from "./firebase.js";

import {
  collection,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


async function salvarProduto(nome, link, linkF, price, store, cat) {

  // cria um ID único manualmente
  const produtoRef = doc(collection(db, "roupas"));
  const produtoId = produtoRef.id;

  const dados = {
    nome,
    link,
    linkF,
    price,
    store
  };

  // salva na coleção principal
  await setDoc(doc(db, "roupas", produtoId), dados);

  // salva na coleção da categoria com o MESMO ID
  await setDoc(doc(db, cat, produtoId), dados);

  await setDoc(doc(db, "vitrine", produtoId), dados);

  alert("Salvo com sucesso!");
}

window.salvarProduto = salvarProduto
