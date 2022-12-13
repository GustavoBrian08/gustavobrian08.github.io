import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

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
const storage = getStorage(app);

const formulario = document.getElementById('new-project-form')
const nome = document.getElementById('name-project')
const tecnoglogia = document.getElementById('technologie-project')
const url = document.getElementById('url-project')
const repositorio = document.getElementById('url-repository')
const thumbnail = document.getElementById('input-file')

const sendProject = async (thumb) => {

    if(nome.value.length != 0 && tecnoglogia.value.length != 0 && url.value.length != 0 && repositorio.value.length != 0 && thumbnail.value.length != 0){
        try {
            const docRef = await addDoc(collection(db, "projects"), {
              nome: nome.value,
              tecnoglogia: tecnoglogia.value,
              url: url.value,
              repositorio: repositorio.value,
              thumbnail: thumb
            });
            nome.value = ''
            tecnoglogia.value = ''
            url.value = ''
            repositorio.value = ''
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

if(formulario){
  formulario.addEventListener("submit", function(e){
      e.preventDefault()
  
      let file = e.target[4].files[0]
      let fileRef = ref(storage, `images/${file.name}`)
  
      uploadBytesResumable(fileRef, file).on("state_changed", snapshot => {
        let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        document.querySelector('progress').value = progress
      }, 
      (error) => console.warn('Erro ao carregar arquivo: ' + error),
      () => {
        getDownloadURL(fileRef).then((downloadURL) => {
          sendProject(downloadURL)
        });
      })
  })
}

// MAIN PAGE

