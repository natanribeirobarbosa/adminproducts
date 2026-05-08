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

async function captureCategories() {

    const ref = doc(db, "config", "allCategories");
    const snapshot = await getDoc(ref);
    const dados = snapshot.data();

    return dados.names;
}

async function apagarPorNome(nome) {

    nomes = await captureCategories;

    nomes.forEach(nome => {
        const q = query(
            collection(db, nome),
            where("nome", "==", nome)
        );

        const snapshot = await getDocs(q);

        snapshot.forEach(async (item) => {
            await deleteDoc(doc(db, "roupas", item.id));
        });

        console.log("Documentos removidos");
    })
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
    await setDoc(doc(db, cat1, produtoId), dados);
    const categories = await captureCategories;

    if (categories.indexof(cat1) == -1) {
        categories.push(cat1)

        const ref = doc(db, "config", "allCategories");

        await updateDoc(ref, {
            names: nomesAtuais
        });
    }

    if (cat2 != '') {
        await setDoc(doc(db, cat2, produtoId), dados);
            if (categories.indexof(cat2) == -1) {
        categories.push(cat2)

        const ref = doc(db, "config", "allCategories");

        await updateDoc(ref, {
            names: nomesAtuais
        });
    }
    }
    if (cat3 != '') {
        await setDoc(doc(db, cat3, produtoId), dados);
            if (categories.indexof(cat3) == -1) {
        categories.push(cat3)

        const ref = doc(db, "config", "allCategories");

        await updateDoc(ref, {
            names: nomesAtuais
        });
    }
    }
    if (cat4 != '') {
        await setDoc(doc(db, cat4, produtoId), dados);
            if (categories.indexof(cat4) == -1) {
        categories.push(cat4)

        const ref = doc(db, "config", "allCategories");

        await updateDoc(ref, {
            names: nomesAtuais
        });
    }
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
          <button onclick='apagarPorNome("${p.nome}")'>
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
window.apagarPorNome = apagarPorNome
window.salvarProduto = salvarProduto


