let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    loader.classList.add('hide');
  });

  const sectionLoader = document.getElementById('section-loader');

  // Sections cibles pour le chargement
  const sectionsWithLoader = ['#portfolio', '#epreuve', '#veille'];

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Vérifie si le lien cible une section avec loader
      if (sectionsWithLoader.includes(targetId)) {
        e.preventDefault(); // Empêche la navigation instantanée
        sectionLoader.classList.add('active');

        // Petite pause avant scroll pour afficher le loader
        setTimeout(() => {
          sectionLoader.classList.remove('active');
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
          });
        }, 2000); // durée du chargement
      }
    });
  });

  function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
  
    lightboxImg.src = imgElement.src; // on remplit avec l'image cliquée
    lightbox.style.display = 'flex';
  }
  
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
  
    lightbox.style.display = 'none';
    lightboxImg.src = ""; // on vide après fermeture
  }
  
  