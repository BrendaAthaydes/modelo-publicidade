// ===== MENU HAMBURGUER =====
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger?.addEventListener('click', () => {
  menu.classList.toggle('ativo');
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox .close');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

let albumAtual = [];
let indexAtual = 0;

document.querySelectorAll('.carrossel-loop img').forEach(img => {
  img.addEventListener('click', () => {
    const album = img.dataset.album;
    albumAtual = Array.from(document.querySelectorAll(`img[data-album="${album}"]`));
    indexAtual = albumAtual.indexOf(img);
    mostrarImagem(indexAtual);
    lightbox.style.display = 'flex';
  });
});

function mostrarImagem(i) {
  const img = albumAtual[i];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightboxCaption.textContent = img.dataset.caption || '';
}

btnNext?.addEventListener('click', () => {
  indexAtual = (indexAtual + 1) % albumAtual.length;
  mostrarImagem(indexAtual);
});

btnPrev?.addEventListener('click', () => {
  indexAtual = (indexAtual - 1 + albumAtual.length) % albumAtual.length;
  mostrarImagem(indexAtual);
});

closeBtn?.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

// ===== CARROSSEIS COM SETAS (com loop infinito manual) =====
const carrosseis = ['retratos', 'eventos', 'lifestyle', 'produtos'];

carrosseis.forEach((id) => {
  const container = document.getElementById(`carrossel-${id}`);
  const btnNext = document.getElementById(`next-${id}`);
  const btnPrev = document.getElementById(`prev-${id}`);
  const slides = container.querySelectorAll("img");
  let currentIndex = 0;

  function getSlideWidth() {
    const slide = slides[0];
    const style = window.getComputedStyle(slide);
    const margin = parseFloat(style.marginRight) || 20;
    return slide.offsetWidth + margin;
  }

  function updateSlider() {
    const offset = getSlideWidth() * currentIndex;
    container.style.transform = `translateX(-${offset}px)`;
    container.style.transition = "transform 0.4s ease";
  }

  btnNext?.addEventListener("click", () => {
    if (currentIndex < slides.length - 3) {
      currentIndex++;
    } else {
      currentIndex = 0; // volta para o início
    }
    updateSlider();
  });

  btnPrev?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 3; // vai para o final
    }
    updateSlider();
  });

  // Recalcular posição ao redimensionar
  window.addEventListener("resize", updateSlider);
});
