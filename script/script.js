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

let deferredPrompt = null; // Stocke l'événement pour l’utiliser plus tard
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

// ⚡ Écoute l'événement lancé par le navigateur quand l'installation est dispo
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // 🔒 Empêche l'affichage auto de la bannière Chrome
  deferredPrompt = e; // 📦 On stocke l'événement pour plus tard
  if (installBanner) {
    installBanner.classList.remove('hidden'); // 🪄 Affiche notre bannière personnalisée
  }
});

// 🎯 Quand l'utilisateur clique sur le bouton "Ajouter à l’écran d’accueil"
if (installBtn) {
  installBtn.addEventListener('click', () => {
    if (installBanner) {
      installBanner.classList.add('hidden'); // 👋 Cache la bannière après clic
    }

    if (deferredPrompt) {
      deferredPrompt.prompt(); // 🧙‍♂️ Déclenche la vraie bannière native d'installation

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Utilisateur a accepté l’installation');
        } else {
          console.log('❌ Utilisateur a refusé l’installation');
        }
        deferredPrompt = null; // 🧼 On nettoie après
      });
    }
  });
}

document.querySelectorAll('.item-name').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    const isOpen = parent.classList.contains('item--open');

    // Ferme tous les autres
    document.querySelectorAll('.item').forEach(item => {
      item.classList.remove('item--open');
    });

    // Ouvre l'actuel si ce n'était pas déjà ouvert
    if (!isOpen) {
      parent.classList.add('item--open');
    }
  });
});
header.setAttribute('aria-expanded', !isOpen);


  function toggleAccordion(element) {
    const item = element.parentElement;
    item.classList.toggle("item--open");
  }

