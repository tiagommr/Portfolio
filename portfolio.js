// Typing effect
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

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Toggle menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Dropdown de idiomas
const langDropdown = document.querySelector(".lang-dropdown");
const langBtn = document.querySelector(".lang-btn");
const langCode = document.querySelector(".lang-code");
const langMenuItems = document.querySelectorAll(".lang-menu li");

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("active");
});

// Mudar bandeira e código ao selecionar idioma
langMenuItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedFlag = item.querySelector(".fi").className;
    const selectedLang = item.dataset.lang.toUpperCase();

    // Atualiza o botão
    langBtn.querySelector(".fi").className = selectedFlag;
    langCode.textContent = selectedLang;

    langDropdown.classList.remove("active");

    console.log("Idioma selecionado:", item.dataset.lang);
  });
});

// Fecha dropdown se clicar fora
document.addEventListener("click", () => {
  langDropdown.classList.remove("active");
});

// ===================
// MODAL + CARROSSEL
// ===================

const projetos = {
  1: {
    title: "MaisTrust",
    description: "Aplicação móvel desenvolvida para a empresa Trust, focada em otimizar a gestão e interação com clientes.",
    images: ["assets/MaisTrust/imagem1.jpg", "assets/MaisTrust/imagem2.jpg", "assets/MaisTrust/imagem3.jpg", "assets/MaisTrust/imagem4.jpg",
              "assets/MaisTrust/imagem5.jpg", "assets/MaisTrust/imagem6.jpg", "assets/MaisTrust/imagem7.jpg", "assets/MaisTrust/imagem8.jpg",
              "assets/MaisTrust/imagem9.jpg", "assets/MaisTrust/imagem10.jpg", "assets/MaisTrust/imagem11.jpg", "assets/MaisTrust/imagem12.jpg",
              "assets/MaisTrust/imagem13.jpg", "assets/MaisTrust/imagem14.jpg", "assets/MaisTrust/imagem15.jpg", "assets/MaisTrust/imagem16.jpg",
              "assets/MaisTrust/imagem17.jpg", "assets/MaisTrust/imagem18.jpg", "assets/MaisTrust/imagem19.jpg", "assets/MaisTrust/imagem20.jpg",
              "assets/MaisTrust/imagem21.jpg", "assets/MaisTrust/imagem22.jpg", "assets/MaisTrust/imagem23.jpg", "assets/MaisTrust/imagem24.jpg",
              "assets/MaisTrust/imagem25.jpg", "assets/MaisTrust/imagem26.jpg", "assets/MaisTrust/imagem27.jpg", "assets/MaisTrust/imagem28.jpg",
              "assets/MaisTrust/imagem29.jpg", "assets/MaisTrust/imagem30.jpg", "assets/MaisTrust/imagem31.jpg", "assets/MaisTrust/imagem32.jpg",
              "assets/MaisTrust/imagem33.jpg", "assets/MaisTrust/imagem34.jpg"]
  },
  2: {
    title: "Mundo em Rotas",
    description: "Plataforma em Laravel para gestão de atividades, reservas e autenticação de utilizadores.",
    images: [
      { type: "video", src: "https://www.youtube.com/embed/1We2TKoN78w"}
    ]
  },
  3: {
    title: "SchoolAir",
    description: "O projeto SchoolAir simula a monitorização da qualidade do ar em salas de aula através de sensores e programação concorrente em C.",
    images: ["assets/schoolair1.jpg", "assets/schoolair2.jpg"]
  },
  4: {
    title: "Drive",
    description: "Sistema de partilha de ficheiros distribuído com autenticação, diretórios e sincronização entre clientes.",
    images: ["assets/drive1.jpg", "assets/drive2.jpg"]
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

// Atualizar imagem + legenda + dots
function updateCarousel() {
  carouselImage.style.opacity = 0;
  carouselImage.style.transform = "translateX(30px)";

  setTimeout(() => {
    const currentItem = currentImages[currentIndex];

    // Se for vídeo
    if (currentItem.type === "video") {
      carouselImage.style.display = "none";
      if (!document.getElementById("carousel-video")) {
        const video = document.createElement("iframe");
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
        document.getElementById("carousel-video").src = currentItem.src;
      }
      carouselCaption.textContent = currentItem.caption || "";
    } 
    // Se for imagem
    else {
      const videoEl = document.getElementById("carousel-video");
      if (videoEl) videoEl.remove();
      carouselImage.style.display = "block";
      carouselImage.src = currentItem.src;
      carouselCaption.textContent = currentItem.caption || "";
    }

    carouselImage.style.opacity = 1;
    carouselImage.style.transform = "translateX(0)";
  }, 250);

  // Atualiza os dots
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

// abrir modal
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

    updateCarousel();
    modal.style.display = "flex";
  });
});

// fechar modal
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = "none";
}

// navegação
document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
});
document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarousel();
});

// suporte a teclado
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") document.querySelector(".carousel-btn.prev").click();
    if (e.key === "ArrowRight") document.querySelector(".carousel-btn.next").click();
    if (e.key === "Escape") closeModal();
  }
});

// ===================
// THEME TOGGLE
// ===================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// carregar preferência guardada
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  if (body.classList.contains("light")) {
    themeToggle.textContent = "🌙"; // ícone lua
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️"; // ícone sol
    localStorage.setItem("theme", "dark");
  }
});
