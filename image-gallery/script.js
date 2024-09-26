const ACCESS_KEY = "WOeWPxyiF-rl3qmL0E5uxdKjIeQZ7taI2EKm04QtNQ8";
const content = document.querySelector('.content');
const form = document.querySelector('.form__container');

//Получение данных по Unsplash API
async function getPhotos(word = '') {

  //При стартовой загрузке страницы
  if (!word.length){
    tag = 'fall';
  }
  //При обработке поиска
  if (word.length){
    tag = word;
  }

  const url = `https://api.unsplash.com/search/photos?query=${tag}&per_page=24&orientation=landscape&client_id=${ACCESS_KEY}`;

  // const response = await fetch(url);
  // const data = await response.json();

  if (response.status === 200) {
    const state = data.results;

    if(state.length === 0) {
      const str = "По вашему запросу ничего не найдено!"
      renderError(str);
    } else {
      setCards(state);
    }
  }
}

//Рендер всех карточек с фото на основе полученых данных
function renderCards(data) {
  let result = '';
  data.forEach(( { urls: { regular }} ) => {
    let card = `<div class="card">
                  <img class="card__img" src="${regular}">
                </div>`;
    result += card;
  });
  return result;
}

//Отображаем все фото и задаем фон первого из них
function setCards (data) {
  content.innerHTML = renderCards(data);
  const img = data[0].urls.regular;
  content.style.background = `url(${img}) 50% 50%/cover no-repeat fixed`;
}

//Рендер картинки с ошибкой и соответвующим текстом
function renderError(str) {
  content.innerHTML = `<div class="error">
                        <p class="error__text">${str}</p>
                      </div>`;
  const imgError = 'assets/not_found.jpg';
  content.style.background = `url(${imgError}) 50% 50%/cover no-repeat fixed`;
}

//Изменение фона в зависимости от наведение курсора
function changeBackground(event) {
  if (event.target.classList.contains('card__img')){
    content.style.background = `url(${event.target.src}) 50% 50%/cover no-repeat fixed`;
  }
}

//Поиск фото по запросу
function search(event) {
  event.preventDefault();
  const data = new FormData(form);
  getPhotos(data.get('search'))
}

window.addEventListener('DOMContentLoaded', getPhotos);
content.addEventListener('mouseover', changeBackground);
form.addEventListener('submit', search);