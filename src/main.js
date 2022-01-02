import '../styles/style.css';

function menuHandler() {
  hamburger.classList.toggle('hamburger--active');
}

function navListHandler() {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('nav-list--active');
}

const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', menuHandler);
hamburger.addEventListener('click', navListHandler);
