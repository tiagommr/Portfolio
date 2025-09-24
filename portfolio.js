// portfolio.js

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

// MODAL POPUP PROJETOS
const projetos = {
    1: {
    title: "MaisTrust",
    description: "Aplicação móvel desenvolvida para a empresa Trust, focada em otimizar a gestão e interação com clientes.",
    images: ["assets/trust1.jpg", "assets/trust2.jpg"]
  },
  2: {
    title: "Mundo em Rotas",
    description: "Plataforma em Laravel para gestão de atividades, reservas e autenticação de utilizadores.",
    images: ["assets/mundo1.jpg", "assets/mundo2.jpg"]
  },
  3: {
    title: "SchoolAir — Monitorização de Qualidade do Ar",
    description: "O projeto SchoolAir simula a monitorização da qualidade do ar em salas de aula através da leitura e processamento de dados de sensores (Temperatura, Humidade, PM2.5, PM10, CO2), armazenados em ficheiros .csv. O sistema utiliza programação concorrente em C (POSIX) para garantir desempenho e sincronização entre múltiplas threads.",
    images: ["assets/schoolair1.jpg", "assets/schoolair2.jpg"]
  },
  4: {
    title: "Drive",
    description: "Este projeto implementa um sistema de partilha de ficheiros distribuído com autenticação, estrutura de diretórios, propagação de alterações entre clientes, utilizando Java RMI e RabbitMQ.",
    images: ["assets/drive1.jpg", "assets/drive2.jpg"]
  }
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalImages = document.getElementById("modal-images");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".ver-projeto").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.projeto;
    const projeto = projetos[id];

    modalTitle.textContent = projeto.title;
    modalDesc.textContent = projeto.description;
    modalImages.innerHTML = "";
    projeto.images.forEach(img => {
      const el = document.createElement("img");
      el.src = img;
      modalImages.appendChild(el);
    });

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// THEME TOGGLE
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
