'use strict';

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * Prevnt 
 * User to see code the Source
 */

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 's' || event.key === 'S')) {
        event.preventDefault();
    }
});

/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);

/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);

/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);

/**
 * Scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);

/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});


/**
 * Language switcher
*/

function setLanguage(language) {
  // Check if the language exists in the translations
  if (!translations[language]) {
    console.error(`La langue "${language}" n'est pas disponible.`);
    return;
  }

  // Browse elements with the data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = translations[language][key];

    if (translation) {
      element.textContent = translation;
    } else {
      console.warn(`Pas de traduction trouvée pour la clé "${key}"`);
    }
  });

  // Update `lang` attribute in HTML tag
  document.documentElement.lang = language;

  // Save language in Local Storage
  localStorage.setItem('language', language);
}

// Load saved language or set default language
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const openModalLinks = document.querySelectorAll('[data-modal-target]');
  const closeModalBtn = document.querySelector('[data-modal-close]');

  // Open Modal
  openModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Close Modal
  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // Close Modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

/**
 * Data Form to Google Sheet
 */

const scriptURL = 'https://script.google.com/macros/s/AKfycbwpClLdMqW40r0aWlwIalbSCVaZEttb6Wkjp2d7NHcRCL2bJOBlS4JenbCYyda_YMEp/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thanks for joining our community" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})