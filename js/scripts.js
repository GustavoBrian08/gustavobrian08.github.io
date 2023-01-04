const navegation = document.querySelector("#navegation")
let n = 1

// NAVEGATION COLOR TRANSITION -----------------------------

if(navegation != null){
    window.addEventListener('scroll', () => {
        let value = window.scrollY
        if (value >= 300) {
            n = 96
        } else if (value <= 250){
            n = 0
        } else {
            n += 0.5
        }
        navegation.style.background = `rgba(18, 18, 18, 0.${n})`
    })
}

// TYPING ANIMATION -----------------------------

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Web Developer!", "Game Developer!", "Full-stack!"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

const type = () => {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", () => { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// SLIDER SKILLS -----------------------------

let slideIndex = 1
let slides = document.getElementsByClassName("mySlides")
setTimeout(() => {if(slides){ showSlides(slideIndex) }}, 1000)

// Next/previous controls
const plusSlides = n => showSlides(slideIndex += n)

function showSlides(n) {
  if (n > slides.length || slideIndex > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length - 2}
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  
  slides[slideIndex-1].style.display = 'block'
  slides[slideIndex].style.display = 'block'
  slides[slideIndex+1].style.display = 'block'
}

setInterval(() => plusSlides(3), 4000)

// HOVER PROJECTS -----------------------------

const projectHover = document.getElementsByClassName('project-hover')
const projectContainer = document.getElementsByClassName('project-container')

const hoverFunction = (add, init) => {
  for (let i = 0; i < projectContainer.length; i++){
    projectContainer[i].onmouseover = () => {
      projectHover[i].classList.remove("hide")
      projectContainer[i].style.scale = add
    }

    projectHover[i].onmouseout = () => {
      projectHover[i].classList.add("hide")
      projectContainer[i].style.scale = init
    }
  }
}

setTimeout(() => {
  if (window.screen.width <= 576){
    hoverFunction(1.04, 0.9)
  } else {
    hoverFunction(1.05, 1.0)
  }
}, 1000);