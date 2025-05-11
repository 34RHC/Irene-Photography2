const texts = {
  en: {
    cities: 'Cities',
    events: 'Events',
    live: 'LIVE',
    nightlife: 'Nightlife',
    portraits: 'Portraits',
    about: 'About Me',
    contact: 'Contact'
  },
  es: {
    cities: 'Ciudades',
    events: 'Eventos',
    live: 'EN VIVO',
    nightlife: 'Vida Nocturna',
    portraits: 'Retratos',
    about: 'Sobre Mí',
    contact: 'Contacto'
  }
};

// Cambiar idioma
const switcher = document.getElementById('languageSwitcher');
if (switcher) {
  switcher.addEventListener('change', (e) => {
    const lang = e.target.value;
    document.querySelectorAll('section').forEach(section => {
      const id = section.id;
      if (texts[lang][id]) {
        section.querySelector('h2').textContent = texts[lang][id];
      }
    });
    document.querySelectorAll('.lang').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll(`.lang.${lang}`).forEach(el => el.classList.remove('hidden'));
  });
}

// Cargar galería desde JSON
fetch('images.json')
  .then(res => res.json())
  .then(data => {
    document.querySelectorAll('section[data-gallery]').forEach(section => {
      const folder = section.getAttribute('data-gallery');
      const gallery = section.querySelector('.gallery');
      const imageNames = data[folder] || [];
      imageNames.forEach(name => {
        const img = document.createElement('img');
        img.src = `assets/galleries/${folder}/${name}`;
        img.alt = `${folder} - ${name}`;
        img.onload = () => img.classList.add('loaded');
        img.onerror = () => gallery.removeChild(img);
        gallery.appendChild(img);
      });
    });
  });

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentImages = [];
let currentIndex = 0;

document.body.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
    const gallery = e.target.closest('.gallery');
    currentImages = Array.from(gallery.querySelectorAll('img'));
    currentIndex = currentImages.indexOf(e.target);
    showImage();
    lightbox.classList.add('visible');
  }
});

function showImage() {
  if (currentImages.length === 0) return;
  lightboxImage.src = currentImages[currentIndex].src;
}

closeBtn.addEventListener('click', () => lightbox.classList.remove('visible'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('visible');
});
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage();
});
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('visible')) return;
  if (e.key === 'ArrowRight') currentIndex = (currentIndex + 1) % currentImages.length;
  if (e.key === 'ArrowLeft') currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  if (e.key === 'Escape') lightbox.classList.remove('visible');
  showImage();
});

// Botón scroll arriba
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
