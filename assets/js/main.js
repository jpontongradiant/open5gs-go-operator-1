/* assets/js/main.js */

// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
      });
    }
    
    // Funcionalidad para copiar código
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const codeBlock = this.previousElementSibling;
        if (codeBlock && codeBlock.tagName.toLowerCase() === 'pre') {
          copyToClipboard(codeBlock.innerText);
          this.innerText = 'Copiado!';
          setTimeout(() => {
            this.innerText = 'Copiar Código';
          }, 2000);
        }
      });
    });
  });
  
  // Función para copiar al portapapeles
  function copyToClipboard(text) {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
  }
  