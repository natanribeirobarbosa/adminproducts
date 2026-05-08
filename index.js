import { db } from "./firebase.js";

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
   query,
  where,
  deleteDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function apagarPorStore(storeNome) {

  const q = query(
    collection(db, "roupas"),
    where("store", "==", storeNome)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(async (item) => {
    await deleteDoc(doc(db, "roupas", item.id));
  });

  console.log("Documentos removidos");
}


async function salvarProduto(nome, link, linkF, price, store, cat1, cat2, cat3, cat4) {

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
  await setDoc(doc(db, cat1, produtoId), dados );
  console.log("dados: "+cat2, cat3, cat4)
    if(cat2!=''){
        await setDoc(doc(db, cat2, produtoId), dados );
  }
    if(cat3!=''){
        await setDoc(doc(db, cat3, produtoId), dados);
  }
    if(cat4!=''){
        await setDoc(doc(db, cat4, produtoId), dados);
  }

  await setDoc(doc(db, "vitrine", produtoId), dados);

  alert("Salvo com sucesso!");
}


function carregarProdutos() {
  const lista = document.getElementById("products")

  onSnapshot(collection(db, "roupas"), snapshot => {
    lista.innerHTML = ""
    let html = '';

    snapshot.forEach(doc => {
      const p = doc.data();
      html += `
       <div class="product">

      <div class="image" style="background-image: url('${p.linkF}')"></div>
        
        <span class="name">${doc.id}</span>
        <span class="name">${p.nome}</span>
       
        <div>
          <button onclick='apagarPorStore("${p.nome}")'>
            REMOVER
          </button>
          
        </div>
      </div>
    
        `

    })
    lista.innerHTML = html;
    
  })

}



carregarProdutos();
window.apagarPorStore = apagarPorStore
window.salvarProduto = salvarProduto


