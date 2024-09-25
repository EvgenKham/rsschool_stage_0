const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

const ACCESS_KEY = "WOeWPxyiF-rl3qmL0E5uxdKjIeQZ7taI2EKm04QtNQ8";
const cards = document.querySelectorAll('.card__img');
const content = document.querySelector('.content');

let state = [];

async function getPhotos() {
  const url = `https://api.unsplash.com/photos/random?&orientation=landscape&client_id=${ACCESS_KEY}&count=12`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 200) {
    console.log(data);
    console.log(data[0].urls.small);
    state = data;
    setCards();
  }
}

function renderCards() {
  let result = '';
  state.forEach(( { urls: { regular }} ) => {
    let card = `<div class="card">
                  <img class="card__img" src="${regular}">
                </div>`;
    result += card;
  });
  return result;
}

function setCards () {
  content.innerHTML = renderCards();
}

getPhotos();

// window.addEventListener('DOMContentLoaded', () => {
// });

function changeBackground(e) {
  if (e.target.classList.contains('card__img')){
    content.style.background = `url(${e.target.src}) 50% 50%/cover no-repeat fixed`;
  }
}

content.addEventListener('mouseover', changeBackground);