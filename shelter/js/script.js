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
    });
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

//Создание одной карточки с животным
function createCard(path, altText, name) {

    let cadrWrapper = document.createElement('div');
    cadrWrapper.classList.add('content-third__slider_card', 'pet', 'swipe');

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

//Получение количества карточек при стартовой загрузке и перезагрузке страницы,
//в зависимости от ширины экрана
function getWidthScreen() {
    let width = document.documentElement.clientWidth;
    let count = 3;

    if ( width >= 1021 ){
        count = 3;
    } else if ( width >= 711 && width < 1020 ){
        count = 2;
    } else if ( width <= 710 ){
        count = 1;
    }

    return count;
}

function getCurrentPets(){
    let pets = document.querySelectorAll('.pet_name');
    namePets = [];
    let currentPets = [];
    // let count = getWidthScreen();

    for ( let i = 0; i < pets.length; i++){
        namePets.push(pets[i].innerHTML);
    }

    namePets.forEach( name => {
        petsJson.forEach( pet => {
            if(name === pet.name){
                currentPets.push(pet);
            }
        });
    });

    return currentPets;
};

//Выбор случайных ID животных, количество зависит от величины экрана
function createUniqueId(current = []){
    let uniqueNumbers = [];
    let count = getWidthScreen();
    let currentsId = current;

    //Выбор случайных и неповторяющихся id животных
    for (let i = 0; uniqueNumbers.length < count; i++){
        let number = Math.floor(Math.random() * (petsJson.length));
        if (uniqueNumbers.includes(number) || currentsId.includes(number)){
            continue;
        }
        uniqueNumbers.push(number);
    }
    console.log();

    return uniqueNumbers;
};


//Формирование массива животных
function createSeqPets(uniqueNum){
    let uniquePets = [];
    let numbers = uniqueNum;

    numbers.forEach( number => {
        for ( let [key, value] of Object.entries(petsJson)){
            if ( String(number) === key ){
                uniquePets.push(value);
            }
        }
    });

    console.log(uniquePets);
    return uniquePets;
}

//Отрисовка карточек с животными в слайдере
function createFragment( unique = []){
    let numbers = [];
    let pets = [];
    if ( unique.length === 0 ){
        numbers = createUniqueId();
        pets = createSeqPets(numbers);
    } else {
        pets = unique;
    }

    let slider = document.querySelector('.content-third__slider');
    let fragment = new DocumentFragment();
    let pathPet = '';
    let namePet = '';
    let altPet = '';

    for(let i = 0; i < pets.length; i++) {
        pathPet = pets[i].img;
        namePet = pets[i].name;
        altPet = `${namePet}-picture`;
        let card = createCard(pathPet, altPet, namePet);
        fragment.append(card);
      }

    slider.appendChild(fragment);
};

createFragment();

//Получение id животного в зависимости от его имени
function getNumbersByNames(sequence = []){
    let currSeq = [];
    let count = getWidthScreen();
    if(sequence.length === 0){
       currSeq = getCurrentPets();
    } else {
        currSeq = sequence.slice(0, count);
    }

    let numbers = [];

    currSeq.forEach( currentPet => {
        for ( let i = 0; i < petsJson.length; i++){
            if ( petsJson[i].name === currentPet.name){
                numbers.push(i);
            }
        }
    })

    return numbers;
};

// function swipe(direction) {
//     const slider = document.querySelector('.content-third__slider');
//     slider.classList.remove('left');
//     slider.classList.remove('right');

//     if (direction === 'right') {
//         slider.classList.add('right');
//     } else if (direction === 'left') {
//         slider.classList.add('left');
//     } else {
//         slider.classList.remove('left');
//         slider.classList.remove('right');
//     }
// };

window.addEventListener('DOMContentLoaded', () => {
    const rightButton = document.querySelector('.arrow__right');
    const leftButton = document.querySelector('.arrow__left');
    const sliderContainer = document.querySelector('.content-third__content');

    let currNumbers = getNumbersByNames();
    let nextNumbers = createUniqueId(currNumbers);
    let prevNumbers = createUniqueId(currNumbers);
    let currSeq = getCurrentPets();
    let nextSeq = createSeqPets(nextNumbers);
    let prevSeq = createSeqPets(prevNumbers);

    //Обработчик на увеличение и уменьшение карточек в слайдере без перезагрузки,
    //при изменении ширины экрана. Если изменяется количество видимых карточек,
    //то следующая и предыдущая последовательности тоже меняются
    window.addEventListener('resize', () => {
        const sliderContainer = document.querySelector('.content-third__slider');

        let count = getWidthScreen();

        let currNumbers = getNumbersByNames();
        let currentPets = getCurrentPets();

        //Находим id отличающийся от исходного и создаем из него массив из одного элемента
        let id = createUniqueId(currNumbers).slice(0,1);

        if ( count > currentPets.length) {
            let pet = createSeqPets(id);
            createFragment(pet);
            currNumbers = getNumbersByNames();
            nextNumbers = createUniqueId(currNumbers);
            prevNumbers = createUniqueId(currNumbers);
            currSeq = getCurrentPets();
            nextSeq = createSeqPets(nextNumbers);
            prevSeq = createSeqPets(prevNumbers);

        } else if ( count < currentPets.length ){
            sliderContainer.lastChild.remove();
            currNumbers = getNumbersByNames();
            nextNumbers = createUniqueId(currNumbers);
            prevNumbers = createUniqueId(currNumbers);
            currSeq = getCurrentPets();
            nextSeq = createSeqPets(nextNumbers);
            prevSeq = createSeqPets(prevNumbers);
        }
    });

    //Пролистывание последовательностей вправо и влево с анимацией
    sliderContainer.addEventListener( 'click', (e) => {
        const parent = e.target.closest('div');
        const cards = document.querySelectorAll('.content-third__slider_card');
        const slider = document.querySelector('.content-third__slider');
        if(parent === rightButton){
            prevSeq = currSeq;
            currSeq = nextSeq;
            currNumbers = getNumbersByNames(nextSeq);
            nextNumbers = createUniqueId(currNumbers);
            nextSeq = createSeqPets(nextNumbers);

            cards.forEach( card => {
                card.classList.add('right');
                setTimeout(() => card.remove(), 500);
            });

            createFragment(currSeq);
            let newCards = document.querySelectorAll('.content-third__slider_card');
            console.log(newCards);
            for ( let i = newCards.length - 1; i >= newCards.length / 2; i--){
                newCards[i].classList.add('left');
                setTimeout(() => newCards[i].classList.remove('left'), 500);
            }

        }
        if(parent === leftButton){
            nextSeq = currSeq;
            currSeq = prevSeq;
            currNumbers = getNumbersByNames(prevSeq);
            prevNumbers = createUniqueId(currNumbers);
            prevSeq = createSeqPets(prevNumbers);

            cards.forEach( card => {
                card.classList.add('left');
                setTimeout(() => card.remove(), 500);
            });

            createFragment(currSeq);
            let newCards = document.querySelectorAll('.content-third__slider_card');
            for ( let i = newCards.length - 1; i >= newCards.length / 2; i--){
                newCards[i].classList.add('right');
                setTimeout(() => newCards[i].classList.remove('right'), 500);
            }
        }
    });
})
