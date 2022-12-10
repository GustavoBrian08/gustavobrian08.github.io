import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDrHE1X_RysXVMgfwa6v7dLq-o-0k8oRZs",
    authDomain: "portfolio-73a62.firebaseapp.com",
    projectId: "portfolio-73a62",
    storageBucket: "portfolio-73a62.appspot.com",
    messagingSenderId: "477337950785",
    appId: "1:477337950785:web:d8cc919158465cbbb784c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const formulario = document.getElementById('new-project-form')

const sendProject = async () => {
    const nome = document.getElementById('name-project')
    const tecnoglogia = document.getElementById('technologie-project')
    const url = document.getElementById('url-project')
    const thumbnail = document.getElementById('input-file')
    if(nome.value.length != 0 && tecnoglogia.value.length != 0 && url.value.length != 0 && thumbnail.value.length != 0){
        try {
            const docRef = await addDoc(collection(db, "projects"), {
              nome: nome.value,
              tecnoglogia: tecnoglogia.value,
              url: url.value,
              thumbnail: thumbnail.value
            });
            nome.value = ''
            tecnoglogia.value = ''
            url.value = ''
            thumbnail.value = ''
            Toastify({
                text: "Project created!",
                duration: 5000,
                position: "center",
                style: {
                    background: "linear-gradient(to right, #661d4e, #2a1763)",
                    fontSize: "1.1rem",
                    fontWeight: "bold"
                  },
            }).showToast();
          } catch (e) {
            console.error("Erro ao criar o novo projeto: ", e);
          }
    } else {
        Toastify({
            text: "Give all information!",
            duration: 10000,
            position: "center",
            style: {
                background: "linear-gradient(to right, #b42727, #f3760f)",
                fontSize: "1.1rem",
                fontWeight: "bold"
              },
        }).showToast();
    }
}

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    sendProject()
})

