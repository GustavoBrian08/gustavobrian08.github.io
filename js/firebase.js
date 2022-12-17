import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
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
const formularioTech = document.getElementById('new-tech-form')
const thumbnail = document.getElementById('input-file')
const nome = document.getElementById('name-project')
const url = document.getElementById('url-project')
const repositorio = document.getElementById('url-repository')
const selectTech = document.getElementById
('select-tech')
const selectCategory = document.getElementById('select-category')
const tags = document.getElementById('tags')
const mainSelect = document.getElementById('technologies-select')
let tagList = []


const toastySuccess = (message) => {
  Toastify({
    text: message,
    duration: 5000,
    position: "center",
    style: {
        background: "linear-gradient(to right, #661d4e, #2a1763)",
        fontSize: "1.1rem",
        fontWeight: "bold"
      }
  }).showToast()
}

const toastyWarn = () => {
  Toastify({
    text: "Give all information!",
    duration: 10000,
    position: "center",
    style: {
        background: "linear-gradient(to right, #b42727, #f3760f)",
        fontSize: "1.1rem",
        fontWeight: "bold"
      }
  }).showToast()
}

const uploadData = (fileRef, file, sendFunction) => {
  uploadBytesResumable(fileRef, file).on("state_changed", snapshot => {
    let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
    document.querySelector('progress').value = progress
  }, 
  (error) => console.warn('Erro ao carregar arquivo: ' + error),
  () => {
    getDownloadURL(fileRef).then((downloadURL) => {
      sendFunction(downloadURL)
    })
  })
}


// NEW PROJECT PAGE
const sendProject = async (thumbURL) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      nome: nome.value,
      tecnologia: loadTags(),
      url: url.value,
      repositorio: repositorio.value,
      thumbnail: thumbURL
    })
    nome.value = ''
    url.value = ''
    tags.remove(tags.children)
    repositorio.value = ''
    thumbnail.value = ''
    
    toastySuccess('Project created!')
  } catch (e) {
    console.error("Erro ao criar o novo projeto: ", e)
  }
}

const loadSelect = async () => {
  const technologies = query(collection(db, "Technologies"))
  const techsData = await getDocs(technologies)
  techsData.forEach((doc) => {
    const option = document.createElement('option')
    option.innerHTML = doc.data().nome
    selectTech.appendChild(option)
  })
}

const createTag = (text) => {
  const span = document.createElement('span')
  const p = document.createElement('p')
  const button = document.createElement('button')
  const i = document.createElement('i')

  span.classList.add('tag')
  p.innerHTML = text
  button.type = 'button'
  button.classList.add('close-tag-button')
  i.classList.add('fa-solid')
  i.classList.add('fa-xmark')
  
  span.appendChild(p)
  span.appendChild(button)
  button.appendChild(i)
  tags.appendChild(span)

  button.onclick = () => {
    button.parentElement.remove()
    tagList.pop()
  }
}

const addTag = () => {
  selectTech.addEventListener('change', () => {
    if(selectTech.options[selectTech.selectedIndex].value != 0)
    createTag(selectTech.options[selectTech.selectedIndex].text)
  })
}

function loadTags(){
  for(let i = 0; i < tags.childElementCount; i++){
    tagList.push(tags.children[i].innerText)
  }
  return tagList.toString()
}

if (selectTech){
  loadSelect()
  addTag()
}


// NEW TECH PAGE
const sendTech = async (thumbURL) => {
  try {
    await addDoc(collection(db, "Technologies"), {
      nome: nome.value,
      categoria: selectCategory.options[selectCategory.selectedIndex].text,
      thumbnail: thumbURL
    })
    nome.value = ''
    thumbnail.value = ''
    
    toastySuccess('New tech added!')
  } catch (e) {
    console.error("Erro ao adicionar a nova tecnologia: ", e)
  }
}

if(formulario){
  formulario.addEventListener("submit", e => {
    e.preventDefault()
    if(nome.value.length != 0 && tags.childElementCount != 0 && url.value.length != 0 && repositorio.value.length != 0 && thumbnail.value.length != 0){
      let file = e.target.children[1].children[6].files[0]
      let fileRef = ref(storage, `images/${file.name}`)

      uploadData(fileRef, file, sendProject)
    } else {
      toastyWarn()
    }
  })

} else if (formularioTech){
  formularioTech.addEventListener('submit', e => {
    e.preventDefault()
    if(nome.value.lengh != 0 && selectCategory.selectedIndex != 0 && thumbnail.value.length != 0){
      let file = e.target[2].files[0]
      let fileRef = ref(storage, `techs/${file.name}`)

      uploadData(fileRef, file, sendTech)
    } else {
      toastyWarn()
    }
  })
}

// MAIN PAGE
const projectsList = document.getElementById('projects-list')
const skills = document.getElementById('technologies')

const loadSkills = async () => {
  const technologies = query(collection(db, "Technologies"))
  const techsData = await getDocs(technologies)
  techsData.forEach((doc) => {
    const container = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('h3')

    container.classList.add('mySlides')
    container.classList.add('fade')
    img.src = doc.data().thumbnail
    img.style.width = '200px'
    img.style.height = '170px'
    title.innerText = doc.data().nome

    container.appendChild(img)
    container.appendChild(title)
    skills.children[1].appendChild(container)
  })
}

const loadMainSelect = async () => {
  const technologies = query(collection(db, "Technologies"))
  const techsData = await getDocs(technologies)
  techsData.forEach((doc) => {
    const option = document.createElement('option')
    option.innerHTML = doc.data().nome
    if(doc.data().categoria == 'Web Development'){
      mainSelect.children[1].appendChild(option)
    } else {
      mainSelect.children[2].appendChild(option)
    }
  })
}

const loadProjects = async () => {
  const projects = query(collection(db, "Projects"))
    const projectsData = await getDocs(projects)
    projectsData.forEach((doc) => {
      const container = document.createElement('div')
      const img = document.createElement('img')
      const hover = document.createElement('div')
      const description = document.createElement('p')
      const title = document.createElement('h3')
      const anchorsDiv = document.createElement('div')
      const anchorLink = document.createElement('a')
      const anchorRepo = document.createElement('a')
      const iRepo = document.createElement('i')
      const iLink = document.createElement('i')

      container.classList.add('project-container')
      img.src = doc.data().thumbnail
      img.alt = doc.data().nome
      hover.classList.add('project-hover')
      description.innerText = doc.data().tecnologia
      title.innerText = doc.data().nome
      anchorsDiv.classList.add('anchors')
      anchorLink.href = doc.data().url
      anchorRepo.href = doc.data().repositorio
      iLink.classList.add('fa-solid')
      iLink.classList.add('fa-link')
      iRepo.classList.add('fa-solid')
      iRepo.classList.add('fa-inbox')

      container.appendChild(img)
      container.appendChild(hover)
      hover.appendChild(description)
      hover.appendChild(title)
      hover.appendChild(anchorsDiv)
      anchorsDiv.appendChild(anchorLink)
      anchorsDiv.appendChild(anchorRepo)
      anchorLink.appendChild(iLink)
      anchorRepo.appendChild(iRepo)
      anchorLink.innerHTML = `${anchorLink.innerHTML}Open Project`
      anchorRepo.innerHTML = `${anchorRepo.innerHTML} Repository`
      projectsList.appendChild(container)
    })
}

// const paginationProjects = () => {
//   const pageButtons = getElementsByClassName('page-buttons')
//   for (let i = 0; i < pageButtons.length; i++){
//     console.log(projectsList.children)
//   }
// }

if(mainSelect){
  loadMainSelect()
  loadSkills()
  loadProjects()
  mainSelect.addEventListener('change', () => {
    const projectHover = document.getElementsByClassName('project-hover')
    for (let i = 0; i < projectHover.length; i++){
      if (mainSelect.options[mainSelect.selectedIndex].text == projectHover[i].children[0].innerText){
        projectHover[i].parentElement.style.display = 'flex'
      } else if(mainSelect.options[mainSelect.selectedIndex].value == 0){
        projectHover[i].parentElement.style.display = 'flex'
      }
      else {
        projectHover[i].parentElement.style.display = 'none'
      }
    }
  })
}