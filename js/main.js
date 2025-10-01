// GSAP É USADO APENAS PELO PRELOADER E MENU
window.addEventListener('load', () => {
    const body = document.querySelector('body');
    gsap.to(body, {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.inOut'
    });
});


const canvas = document.getElementById('aurora-canvas');
const ctx = canvas.getContext('2d');
let blobs = [];
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Blob {
    constructor(color, x, y, radius) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update() {
        const springFactor = 0.04;
        let targetX = this.originX;
        let targetY = this.originY;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 250;

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const forceX = (dx / dist) * force * 25;
            const forceY = (dy / dist) * force * 25;
            targetX += forceX;
            targetY += forceY;
        }

        this.x += (targetX - this.x) * springFactor;
        this.y += (targetY - this.y) * springFactor;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initAurora() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blobs = [
        new Blob('rgba(59, 130, 246, 0.5)', canvas.width * 0.2, canvas.height * 0.3, 250),
        new Blob('rgba(91, 33, 182, 0.5)', canvas.width * 0.8, canvas.height * 0.2, 300),
        new Blob('rgba(129, 28, 152, 0.4)', canvas.width * 0.7, canvas.height * 0.8, 280),
        new Blob('rgba(30, 64, 175, 0.4)', canvas.width * 0.3, canvas.height * 0.7, 220)
    ];
}

function animateAurora() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const blob of blobs) {
        blob.update();
        blob.draw();
    }
    requestAnimationFrame(animateAurora);
}

initAurora();
animateAurora();
window.addEventListener('resize', initAurora);

// --- SCRIPT DO PRELOADER MELHORADO ---
const preloader = document.getElementById('preloader');
const preloaderTitle = document.getElementById('preloader-title');
const preloaderUnderline = document.getElementById('preloader-underline');

function setupPreloaderAnimation() {
    preloaderTitle.style.visibility = 'visible';
    const text = preloaderTitle.textContent;
    preloaderTitle.textContent = '';

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        preloaderTitle.appendChild(span);
    });

    const tl = gsap.timeline();

    tl.fromTo(".preloader-title span", {
        autoAlpha: 0,
        y: 40,
        rotationX: -90,
        filter: 'blur(8px)'
    }, {
        duration: 1.2,
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.2
    });

    tl.to(preloaderUnderline, {
        duration: 0.8,
        scaleX: 1,
        ease: "power2.out"
    }, "-=0.6");

    tl.to(preloader, {
        duration: 1.0,
        opacity: 0,
        ease: 'power2.inOut',
        delay: 0.5,
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });
}

if (sessionStorage.getItem('preloaderShown') === 'true') {
    preloader.style.display = 'none';
} else {
    window.addEventListener('load', setupPreloaderAnimation);
    sessionStorage.setItem('preloaderShown', 'true');
}

// --- ANIMAÇÃO AO ROLAR ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- FORMULÁRIO DE CONTATO ---
const form = document.getElementById('contact-form');
if (form) {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = submitBtn.querySelector('.submit-text');
    const successMessage = document.getElementById('form-success-message');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitText.textContent = 'A enviar...';
        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('hidden');
            submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            submitBtn.classList.add('bg-green-600');
            submitText.textContent = 'Enviado!';
            setTimeout(() => {
                successMessage.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-600');
                submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                submitText.textContent = 'Enviar Mensagem';
            }, 4000);
        }, 1500);
    });
}


// --- EFEITO DE VIDRO NO HEADER ---
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => { header.classList.toggle('header-scrolled', window.scrollY > 50); });
}

// --- DADOS DO PORTFÓLIO ---
const allCertificates = [
    { title: 'Formação .NET Developer', institution: 'Digital Innovation One (DIO)', image: 'https://i.ibb.co/gb70xyVm/Captura-de-tela-18-7-2025-234143.jpg', link: '#' },
    { title: 'Arquiteto de Soluções AWS', institution: 'Digital Innovation One (DIO)', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+AWS', link: '#' },
    { title: 'JavaScript Moderno (ES6+)', institution: 'Udemy', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+JS', link: '#' },
    { title: 'Docker para Desenvolvedores', institution: 'Alura', image: 'https://placehold.co/1920x1080/111111/60a5fa?text=Certificado+Docker', link: '#' },
];

const allProjects = [
    { title: 'Sistema de Estacionamento', description: 'Sistema de console em C# para gerenciar a entrada, saída e cobrança de veículos.', video: 'https://placehold.co/600x400/000/fff?text=Estacionamento', link: 'https://github.com/tarxdev/sistema-estacionamento-csharp.git' },
    { title: 'Sistema de Hospedagem', description: 'Modelo de classes em C# para um sistema de hotel, com lógica para cálculo de diárias.', video: 'https://placehold.co/600x400/000/fff?text=Hospedagem', link: 'https://github.com/tarxdev/sistema-hospedagem-csharp.git' },
    { title: 'Modelagem de Celular (POO)', description: 'Demonstração de POO para modelar diferentes marcas de celulares em C#.', video: 'https://placehold.co/600x400/000/fff?text=Celular+POO', link: 'https://github.com/tarxdev/sistema-celular-oop-csharp.git' },
    { title: 'Site com Docker e Apache', description: 'Uso de Docker Compose para servir um site estático com um container do servidor Apache.', video: 'https://placehold.co/600x400/000/fff?text=Docker', link: 'https://github.com/tarxdev/desafio-docker-compose-apache.git' },
];

const allArticles = [
    { title: 'Decifrando o DNA do Hit Brasileiro', publication: 'Python', image: 'https://i.ibb.co/xSXRP8GQ/artigo-1.png', link: 'https://web.dio.me/articles/python-na-minha-jornada-como-essa-linguagem-mudou-meu-jeito-de-programar-pythonnadio-8d0257e84c6e?back=/articles' },
    { title: 'Introdução ao Docker', publication: 'Dev.to', image: 'https://placehold.co/600x400/1e293b/94a3b8?text=Artigo+Docker', link: '#' },
    { title: 'Dominando o async/await em JavaScript', publication: 'Medium', image: 'https://placehold.co/600x400/1e293b/94a3b8?text=Artigo+JS', link: '#' },
];

const allTechLogos = [
  { src: "img/react.png", alt: "React Native" },
  { src: "img/angular.png", alt: "Angular" },
  { src: "img/TypeScript.png", alt: "TypeScript" },
  { src: "img/vue.png", alt: "Vue" },
  { src: "img/js.png", alt: "JavaScript" },
  { src: "img/html.png", alt: "HTML5" },
  { src: "img/css.png", alt: "CSS3" },
];

// --- FUNÇÕES DE GERAÇÃO DE CONTEÚDO ---
function createItemCardHTML(item) {
    const subtext = item.institution || item.publication || item.description || 'Clique para ver mais';
    const buttonText = item.link.includes('github') ? 'Ver no GitHub' : (item.publication ? 'Ler Artigo' : 'Ver Credencial');
    const truncatedSubtext = subtext.length > 150 ? subtext.substring(0, 150) + '...' : subtext;

    return `
        <article>
            <img src="${item.image || item.video}" alt="Imagem de ${item.title}">
            <h2>${item.title}</h2>
            <div>
                <p>${truncatedSubtext}</p> 
                <a href="${item.link}" target="_blank" rel="noopener noreferrer">${buttonText}</a>
            </div>
        </article>
    `;
}

function populateGrid(container, items) {
    if (!container || !items || items.length === 0) return;
    container.innerHTML = items.map(item => createItemCardHTML(item)).join('');
}

function setupLogoScroller(container, logos) {
    if (!container || !logos || logos.length === 0) return;

    const duplicatedLogos = [...logos, ...logos];
    const listContent = duplicatedLogos.map(item => `
        <div class="logo-scroller__item">
            <img src="${item.src}" alt="${item.alt}" draggable="false" />
        </div>
    `).join('');

    container.innerHTML = `<div class="logo-scroller__track">${listContent}</div>`;
}


// --- LÓGICA EXECUTADA AO CARREGAR A PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA MÚSICA DE FUNDO ---
    const audio = document.getElementById('background-audio');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    if (musicToggleBtn && audio) {
        const soundOffIcon = document.getElementById('sound-off-icon');
        const soundOnIcon = document.getElementById('sound-on-icon');
        audio.volume = 0.2;

        musicToggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        soundOffIcon.classList.add('hidden');
                        soundOnIcon.classList.remove('hidden');
                    }).catch(error => {
                        console.error("Erro ao tocar a música:", error);
                    });
                }
            } else {
                audio.pause();
                soundOnIcon.classList.add('hidden');
                soundOffIcon.classList.remove('hidden');
            }
        });
    }

    // --- LÓGICA DO MENU HAMBÚRGUER RESTAURADA ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    if (hamburgerBtn && mainNav && menuOverlay) {
        const body = document.body;
        function toggleMenu(callback) {
            const isMenuOpen = hamburgerBtn.classList.contains('is-active');
            const tl = gsap.timeline({
                defaults: { ease: 'power3.inOut' },
                onComplete: () => { if (typeof callback === 'function') { callback(); } }
            });

            if (isMenuOpen) {
                tl.to('.mobile-nav-link', { opacity: 0, x: 30, duration: 0.3, stagger: 0.05 })
                .to(mainNav, { x: '100%', duration: 0.4 }, "-=0.2")
                .to(menuOverlay, { opacity: 0, duration: 0.4 }, "<")
                .call(() => {
                    mainNav.classList.add('translate-x-full');
                    gsap.set(mainNav, { clearProps: 'transform' });
                    menuOverlay.classList.add('pointer-events-none');
                    hamburgerBtn.classList.remove('is-active');
                    body.classList.remove('menu-open');
                });
            } else {
                body.classList.add('menu-open');
                hamburgerBtn.classList.add('is-active');
                mainNav.classList.remove('translate-x-full');
                menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                tl.to(menuOverlay, { opacity: 1, duration: 0.4 })
                .fromTo(mainNav, { x: '100%' }, { x: '0%', duration: 0.4 }, "<")
                .to('.mobile-nav-link', { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 });
            }
        }
        hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        menuOverlay.addEventListener('click', () => toggleMenu());
        document.querySelectorAll('.nav-link-scroll').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const isMobileClick = window.innerWidth < 768 && mainNav.contains(link);
                const navigateAction = () => {
                    const targetElement = document.querySelector(link.getAttribute('href'));
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                };
                if (isMobileClick && hamburgerBtn.classList.contains('is-active')) {
                    toggleMenu(navigateAction);
                } else { navigateAction(); }
            });
        });
    }
    
    // --- LÓGICA PARA GERAR OS GRIDS DE CARDS ---
    const galleryCerts = document.getElementById('gallery-container-certs');
    const galleryProjs = document.getElementById('gallery-container-projs');
    const galleryArts = document.getElementById('gallery-container-arts');

    populateGrid(galleryCerts, allCertificates);
    populateGrid(galleryProjs, allProjects);
    populateGrid(galleryArts, allArticles);

    // --- INICIALIZAÇÃO DO LETREIRO DE LOGOS ---
    const logoContainer = document.getElementById('tech-logo-loop');
    if (logoContainer && allTechLogos) {
        setupLogoScroller(logoContainer, allTechLogos);
    }
});