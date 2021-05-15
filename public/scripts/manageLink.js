function setActiveLink(url) {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') == url) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function getCurrentURL(e) {
  let currentURL = window.location.pathname;
  setActiveLink(currentURL);
  console.log(currentURL);
}

window.addEventListener('load', getCurrentURL);
