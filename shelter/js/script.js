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
