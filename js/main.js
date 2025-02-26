// Variables
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const codeBlocks = document.querySelectorAll('pre code');
const copyButtons = document.querySelectorAll('.btn-copy');

// Función para activar el menú móvil
function toggleNav() {
    // Toggle para la navegación
    nav.classList.toggle('nav-active');
    
    // Animación para los links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animación para el botón hamburguesa
    burger.classList.toggle('toggle');
}

// Función para copiar código al portapapeles
function copyToClipboard(button, codeBlock) {
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Cambiar el texto del botón temporalmente
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.classList.add('copied');
        
        // Restaurar el texto original después de 2 segundos
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar el código: ', err);
    });
}

// Inicializar highlight.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar resaltado de sintaxis
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
        
        // Agregar botones de copia
        document.querySelectorAll('pre').forEach(block => {
            if (!block.querySelector('.btn-copy')) {
                const button = document.createElement('button');
                button.className = 'btn-copy';
                button.textContent = 'Copiar';
                
                button.addEventListener('click', () => {
                    copyToClipboard(button, block);
                });
                
                block.style.position = 'relative';
                block.appendChild(button);
            }
        });
    }
});

// Event Listeners
if (burger) {
    burger.addEventListener('click', toggleNav);
}

// Cerrar el menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            toggleNav();
        }
    });
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});