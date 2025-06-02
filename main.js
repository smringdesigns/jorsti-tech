document.addEventListener('DOMContentLoaded', () => {
  // Variables globales
  const formulario = document.querySelector('form[action="https://formsubmit.co/jorstitech@gmail.com"]'); // tu formulario real
  const btnModo = document.getElementById('dark-mode-toggle'); // botón modo oscuro según HTML
  const body = document.body;

  // Menú móvil
  const menuBtn = document.querySelector('.mobile-menu'); // el botón hamburguesa ☰ en tu HTML
  const navMenu = document.querySelector('nav.d-none.d-lg-block'); // menú principal (se oculta en móvil)

  // --- Validación y envío del formulario ---
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      // Validación simple antes de enviar (puedes ampliarla)
      const nombre = formulario.querySelector('#nombre').value.trim();
      const email = formulario.querySelector('#email').value.trim();
      const phone = formulario.querySelector('#phone').value.trim();
      const business = formulario.querySelector('#business').value.trim();
      const message = formulario.querySelector('#message').value.trim();

      if (!nombre || !email || !phone || !business || !message) {
        e.preventDefault();
        alert('Por favor, completa todos los campos requeridos.');
        return false;
      }

      // Opcional: mostrar alerta o mensaje antes de enviar
      alert(`Gracias por contactarte, ${nombre}. Pronto te responderemos a ${email}.`);
      // El formulario enviará a formsubmit.co automáticamente
    });
  }

  // --- Modo oscuro ---
  const modoGuardado = localStorage.getItem('modo');
  if (modoGuardado === 'oscuro') {
    body.classList.add('oscuro');
    if (btnModo) {
      btnModo.querySelector('#dark-icon').textContent = '☀️';
      btnModo.querySelector('#dark-text').textContent = 'Modo Claro';
    }
  }

  if (btnModo) {
    btnModo.addEventListener('click', () => {
      body.classList.toggle('oscuro');
      if (body.classList.contains('oscuro')) {
        btnModo.querySelector('#dark-icon').textContent = '☀️';
        btnModo.querySelector('#dark-text').textContent = 'Modo Claro';
        localStorage.setItem('modo', 'oscuro');
      } else {
        btnModo.querySelector('#dark-icon').textContent = '🌙';
        btnModo.querySelector('#dark-text').textContent = 'Modo Oscuro';
        localStorage.setItem('modo', 'claro');
      }
    });
  }

  // --- Menú móvil ---
  // Aquí asumimos que el menú móvil es el botón con clase .mobile-menu que muestra/oculta el nav
  // En tu HTML actual, el nav principal está oculto en móviles con d-none d-lg-block
  // Para hacerlo funcional, podemos clonar el nav en móvil o mejor crear uno específico.
  // Para simplicidad, togglearemos una clase que muestre u oculte el nav en móvil.

  if (menuBtn && navMenu) {
    menuBtn.setAttribute('role', 'button');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'main-nav');

    // Damos id al nav para aria-controls
    navMenu.setAttribute('id', 'main-nav');

    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));

      // Alternar clase para mostrar u ocultar en móvil
      navMenu.classList.toggle('d-none'); 
      navMenu.classList.toggle('d-block'); 
    });
  }

  // --- Carga dinámica del blog ---
  const blogList = document.getElementById('blog-list');
  if (blogList) {
    fetch('blog.json')
      .then(response => response.json())
      .then(articulos => {
        articulos.forEach(item => {
          const col = document.createElement('div');
          col.className = 'col-md-4';

          col.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${item.imagen}" class="card-img-top" alt="${item.titulo}">
              <div class="card-body">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text"><small class="text-muted">${item.fecha}</small></p>
                <p class="card-text">${item.resumen}</p>
              </div>
            </div>
          `;

          blogList.appendChild(col);
        });
      })
      .catch(error => {
        console.error('Error al cargar el blog:', error);
      });
  }
});
