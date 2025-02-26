// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Code copy buttons
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(function(codeBlock) {
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.textContent = 'Copiar';
      codeBlock.appendChild(copyButton);
      
      // Add click event
      copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code');
        let textToCopy = code ? code.textContent : codeBlock.textContent;
        
        // Remove the copyButton text from the copied content
        textToCopy = textToCopy.replace('Copiar', '').trim();
        
        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy).then(function() {
          // Success feedback
          copyButton.textContent = 'Copiado!';
          setTimeout(function() {
            copyButton.textContent = 'Copiar';
          }, 2000);
        }).catch(function(err) {
          console.error('No se pudo copiar el texto: ', err);
          copyButton.textContent = 'Error';
          setTimeout(function() {
            copyButton.textContent = 'Copiar';
          }, 2000);
        });
      });
    });
    
    // Custom copy buttons (for YAML examples)
    const customCopyButtons = document.querySelectorAll('.code-copy-button[data-target]');
    customCopyButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const targetId = button.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId);
        
        if (targetBlock) {
          navigator.clipboard.writeText(targetBlock.textContent).then(function() {
            // Success feedback
            button.textContent = 'Copiado!';
            setTimeout(function() {
              button.textContent = 'Copiar Código';
            }, 2000);
          }).catch(function(err) {
            console.error('No se pudo copiar el texto: ', err);
            button.textContent = 'Error';
            setTimeout(function() {
              button.textContent = 'Copiar Código';
            }, 2000);
          });
        }
      });
    });
    
    // Syntax highlighting for code blocks
    document.querySelectorAll('pre code').forEach(function(block) {
      if (window.hljs) {
        hljs.highlightElement(block);
      }
    });
    
    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(function(link) {
      const linkPath = new URL(link.href).pathname;
      
      // Check if the current path starts with the link path
      // This allows sub-pages to highlight their parent menu item
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
    
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Collapsible sections
    const collapsibleHeadings = document.querySelectorAll('.collapsible-heading');
    
    collapsibleHeadings.forEach(function(heading) {
      heading.addEventListener('click', function() {
        this.classList.toggle('active');
        
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
    
    // Create a simple lightbox for images
    const contentImages = document.querySelectorAll('.page-content img:not(.no-lightbox)');
    
    contentImages.forEach(function(img) {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        
        const imgClone = document.createElement('img');
        imgClone.src = img.src;
        imgClone.style.maxWidth = '90%';
        imgClone.style.maxHeight = '90%';
        imgClone.style.objectFit = 'contain';
        
        lightbox.appendChild(imgClone);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', function() {
          document.body.removeChild(lightbox);
        });
      });
    });
    
    // Track active section for documentation pages with a table of contents
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = [];
    
    tocLinks.forEach(function(link) {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          sections.push({
            id: targetId.substring(1),
            element: target,
            link: link
          });
        }
      }
    });
    
    // Only set up scroll tracking if we have both TOC links and corresponding sections
    if (tocLinks.length > 0 && sections.length > 0) {
      window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollPosition = window.scrollY + 100; // Offset to trigger earlier
        
        // Find the current section
        let currentSection = null;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          
          // Check if the top of the section is above our current scroll position
          if (section.element.offsetTop <= scrollPosition) {
            currentSection = section;
          } else {
            // If we've gone past the current section, break
            break;
          }
        }
        
        // Remove active class from all links
        tocLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        
        // Add active class to current section's link
        if (currentSection) {
          const activeLink = document.querySelector(`.table-of-contents a[href="#${currentSection.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }
  });