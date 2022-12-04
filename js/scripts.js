const navegation = document.querySelector("#navegation")
let n = 1

// NAVEGATION COLOR TRANSITION

if(navegation != null){
    window.addEventListener('scroll', () => {
        let value = window.scrollY
        if (value >= 200) {
            n = 9
        } else if (value <= 150){
            n = 0
        } else {
            n += 0.5
        }
        navegation.style.background = `rgba(0, 0, 0, 0.${n})`
    })
}

// SLIDER SKILLS

let slideIndex = 1
let slides = document.getElementsByClassName("mySlides")
showSlides(slideIndex)

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