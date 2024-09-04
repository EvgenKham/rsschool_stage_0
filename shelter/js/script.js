const petsJson = [
    {
      "name": "Jennifer",
      "img": "assets/images/jennifer.webp",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "assets/images/sophia.webp",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "assets/images/woody.webp",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "assets/images/scarlett.webp",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "assets/images/katrine.webp",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "assets/images/timmy.webp",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "assets/images/freddie.webp",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "assets/images/charly.webp",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];


//Поведение 'бургера' и отображение меню
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.nav-menu');
    const menuItem = document.querySelectorAll('.nav-menu__list-item');
    const burger = document.querySelector('.burger');
    const main  = document.querySelector('main');
    const body = document.body;

    body.addEventListener('click', (e) => {
        if (e.target.classList.contains('header__nav')){
            return false;
        } else if (burger.classList.contains('burger_active')) {
            burger.classList.remove('burger_active');
            menu.classList.remove('nav-menu_active');
            main.classList.remove('backgroun-opacity');
            body.classList.remove('menu-opened');
        } else if (e.target === burger) {
            burger.classList.toggle('burger_active');
            menu.classList.toggle('nav-menu_active');
            main.classList.toggle('backgroun-opacity');
            body.classList.toggle('menu-opened');
        }
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.toggle('burger_active');
            menu.classList.toggle('nav-menu_active');
            main.classList.toggle('backgroun-opacity');
            body.classList.toggle('menu-opened');
        })
    })
})

// Плавный скролл до выбранного элемента из меню
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

//Реализация слайдера-карусели на странице Main
//Получаем данные о животных из json файла
// let pets = [];
// fetch('js/pets.json')
//   .then(response => response.json())
//   .then(petsJson => {
//     for (let i = 0; i < petsJson.length; i++ ){
//         pets[i] = petsJson[i];
//     }
// });

//Создание карточки с животным
function createCard(path, altText, name) {

    let cadrWrapper = document.createElement('div');
    cadrWrapper.classList.add('content-third__slider_card', 'pet');

    let img = document.createElement('img');
    img.classList.add('pet_image');
    img.setAttribute('src', path);
    img.setAttribute('alt', altText);
    cadrWrapper.append(img);

    let paragraph = document.createElement('p');
    paragraph.classList.add('pet_name');
    paragraph.innerHTML = name;
    cadrWrapper.append(paragraph);

    let button = document.createElement('div');
    button.classList.add('pet__button-container');

    let link = document.createElement('a');
    link.classList.add('pet__button-container_item', 'btn');
    link.setAttribute('href', '#');
    link.innerHTML = 'Learn more';

    button.append(link);
    cadrWrapper.append(button);

    return cadrWrapper;
};

//Выбор 3 случайных животных
function chooseUnique(){
    let uniquePets = [];
    let uniqueNumbers = [];

    for (let i = 0; uniqueNumbers.length < 3; i++){
        let number = Math.floor(Math.random() * (petsJson.length));
        if (uniqueNumbers.includes(number)){
            continue;
        }
        uniqueNumbers.push(number);
    }

    uniqueNumbers.forEach( number => {
        for ( let [key, value] of Object.entries(petsJson)){
            if ( String(number) === key ){
                uniquePets.push(value);
            }
        }
    });

    return uniquePets;
};

//Начальное создание карточек при первичной загрузке
function createFragment(){
    // console.log(chooseUnique());
    const pets = chooseUnique();
    let slider = document.querySelector('.content-third__slider');
    let fragment = new DocumentFragment();
    let pathPet = '';
    let namePet = '';
    let altPet = '';

    // console.log(pets.length);
    for(let i = 0; i < pets.length; i++) {
        pathPet = pets[i].img;
        namePet = pets[i].name;
        altPet = `${namePet}-picture`;
        let card = createCard(pathPet, altPet, namePet);
        fragment.append(card);
      }

    slider.appendChild(fragment);
};

console.log(window.innerWidth);
// 1021px и > = 3 животных
// 711 - 1020px = 2 животных
// < и 710px = 1 животное


createFragment();

