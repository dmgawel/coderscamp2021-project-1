import '../styles/style.css';

// navigation
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navigation-list');
  const navLinks = document.querySelectorAll('.navigation-list li');

  burger.addEventListener('click', () => {
    //Toggle Nav
    nav.classList.toggle('navigation-list-active');

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    //Burger Animation
    burger.classList.toggle('toggle');
  });
};

navSlide();
