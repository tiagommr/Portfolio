// ===================
// TYPING EFFECT INTRO
// ===================
function typeWriter(el, text, speed = 120) {
  return new Promise((resolve) => {
    let i = 0;
    const step = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        resolve();
      }
    };
    step();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const intro = document.getElementById("intro");
  const typingEl = document.getElementById("typing");
  const subtitle = document.getElementById("subtitle");
  const main = document.getElementById("main-content");

  main.style.display = "none";

  await typeWriter(typingEl, "Tiago Rêga", 120);
  subtitle.classList.add("show");

  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
      main.style.display = "block";
      main.classList.add("fade-in");
    }, 1000);
  }, 1200);
});

// ===================
// NAVBAR SCROLL EFFECT
// ===================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===================
// MENU MOBILE
// ===================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ===================
// DROPDOWN DE IDIOMAS
// ===================
const langDropdown = document.querySelector(".lang-dropdown");
const langBtn = document.querySelector(".lang-btn");
const langCode = document.querySelector(".lang-code");
const langMenuItems = document.querySelectorAll(".lang-menu li");

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("active");
});

langMenuItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedFlag = item.querySelector(".fi").className;
    const selectedLang = item.dataset.lang.toUpperCase();

    langBtn.querySelector(".fi").className = selectedFlag;
    langCode.textContent = selectedLang;

    langDropdown.classList.remove("active");

    console.log("Idioma selecionado:", item.dataset.lang);
  });
});

document.addEventListener("click", () => {
  langDropdown.classList.remove("active");
});

// ===================
// MODAL + CARROSSEL
// ===================
const projetos = {
  1: {
    title: "MaisTrust",
    description: "Aplicação móvel desenvolvida para a empresa Trust, focada em otimizar a gestão e interação com clientes. Este Projeto é composto por 3 repositórios: App Móvel (Flutter), Backend (Spring Boot) e Web (React).",
    images: Array.from({ length: 34 }, (_, i) => `assets/MaisTrust/imagem${i+1}.jpg`)
  },
  2: {
    title: "Mundo em Rotas",
    description: "Plataforma em Laravel para gestão de atividades, reservas e autenticação de utilizadores.",
    images: [
      { type: "video", src: "https://www.youtube.com/embed/1We2TKoN78w" }
    ]
  },
  3: {
    title: "SchoolAir",
    description: "O projeto SchoolAir simula a monitorização da qualidade do ar em salas de aula através de sensores e programação concorrente em C.",
    images: [] // sem imagem
  },
  4: {
    title: "Drive",
    description: "Sistema de partilha de ficheiros distribuído com autenticação, diretórios e sincronização entre clientes.",
    images: [] // sem imagem
  },
  5: {
  title: "Gestão de Publicações Científicas",
  description: "Aplicação em Java que permite gerir artigos, autores e publicações, explorando relações através de grafos para analisar colaborações e redes de coautorias.",
  images: [] // sem imagem
  },
  6: {
  title: "Gestão de Palavras (UFP6)",
  description: "Projeto em C que implementa estruturas de dados dinâmicas para gerir palavras e respetivos códigos UFP6, permitindo inserção, remoção, pesquisa, ordenação e comparação de combinações.",
  images: [] // sem imagem
  }


};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const carouselImage = document.getElementById("carousel-image");
const carouselCaption = document.getElementById("carousel-caption");
const carouselDots = document.getElementById("carousel-dots");
const closeBtn = document.querySelector(".close");

let currentImages = [];
let currentIndex = 0;

function updateCarousel() {
  const carousel = document.querySelector(".modal-carousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  //Caso não haja imagens/vídeos
  if (!currentImages.length) {
    carousel.style.display = "none";  // esconde todo o carrossel
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    carouselImage.style.display = "none";

    const videoEl = document.getElementById("carousel-video");
    if (videoEl) videoEl.remove();

    carouselDots.innerHTML = "";
    carouselCaption.textContent = "";
    return;
  }

  //Caso haja imagens/vídeos
  carousel.style.display = "flex";
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";

  carouselImage.style.opacity = 0;
  carouselImage.style.transform = "translateX(30px)";

  setTimeout(() => {
    const currentItem = currentImages[currentIndex];

    if (currentItem.type === "video") {
      carouselImage.style.display = "none";
      let video = document.getElementById("carousel-video");
      if (!video) {
        video = document.createElement("iframe");
        video.id = "carousel-video";
        video.width = "100%";
        video.height = "500";
        video.src = currentItem.src;
        video.title = "YouTube video player";
        video.frameBorder = "0";
        video.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        video.allowFullscreen = true;
        document.querySelector(".carousel-image-wrapper").prepend(video);
      } else {
        video.src = currentItem.src;
      }
      carouselCaption.textContent = currentItem.caption || "";
    } else {
      const videoEl = document.getElementById("carousel-video");
      if (videoEl) videoEl.remove();
      carouselImage.style.display = "block";
      carouselImage.src = currentItem.src;
      carouselCaption.textContent = currentItem.caption || "";
    }

    carouselImage.style.opacity = 1;
    carouselImage.style.transform = "translateX(0)";
  }, 250);

  //Atualizar dots
  carouselDots.innerHTML = "";
  currentImages.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    carouselDots.appendChild(dot);
  });
}


// Abrir modal
document.querySelectorAll(".ver-projeto").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.projeto;
    const projeto = projetos[id];

    modalTitle.textContent = projeto.title;
    modalDesc.textContent = projeto.description;

    currentImages = projeto.images.map(item =>
      typeof item === "string" ? { type: "image", src: item, caption: "" } : item
    );
    currentIndex = 0;

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);

    updateCarousel();
  });
});

// Fechar modal
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => { modal.style.display = "none"; }, 400);
}
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Navegação
document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
});
document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarousel();
});

// Teclado
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") document.querySelector(".carousel-btn.prev").click();
    if (e.key === "ArrowRight") document.querySelector(".carousel-btn.next").click();
    if (e.key === "Escape") closeModal();
  }
});

// Swipe mobile
let startX = 0;
carouselImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
carouselImage.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) document.querySelector(".carousel-btn.next").click();
  if (endX - startX > 50) document.querySelector(".carousel-btn.prev").click();
});

// ===================
// ANIMAÇÃO AO SCROLL
// ===================
const revealElements = document.querySelectorAll(
  "section, .exp-card, .card, .skill, .hero-text, .hero-img"
);

revealElements.forEach(el => el.classList.add("scroll-reveal"));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // só anima uma vez
      }
    });
  },
  { threshold: 0.15 } // dispara quando 15% do elemento está visível
);

revealElements.forEach(el => observer.observe(el));


// ===================
// THEME TOGGLE
// ===================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  if (body.classList.contains("light")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});
