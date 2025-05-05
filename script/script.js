// 🍔 Menu burger
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active');
};

// 🔗 Scroll actif sur les liens de navigation
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
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

  // Sticky Header
  let header = document.querySelector('header');
  header.classList.toggle('sticky', top > 100);

  // Ferme menu mobile
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block'; // Affiche le bouton quand prêt
});

if (installBtn) {
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("✅ Installation acceptée !");
        } else {
          console.log("❌ Installation refusée");
        }
        deferredPrompt = null;
      });
    }
  });
}



// 📂 Accordéons (style "item-name" cliquable)
document.querySelectorAll('.item-name').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    const isOpen = parent.classList.contains('item--open');

    // Ferme tous les autres
    document.querySelectorAll('.item').forEach(item => {
      item.classList.remove('item--open');
      const name = item.querySelector('.item-name');
      if (name) name.setAttribute('aria-expanded', 'false');
    });

    // Ouvre le bon
    if (!isOpen) {
      parent.classList.add('item--open');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});
