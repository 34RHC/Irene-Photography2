
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

const switcher = document.getElementById('languageSwitcher');
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

// Load gallery images
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

// Fade-in animation on scroll
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => sectionObserver.observe(section));

// Lightbox functionality
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

// Show Back to Top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
