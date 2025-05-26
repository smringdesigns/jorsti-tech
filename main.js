document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('nav ul');

  if (mobileMenuButton && navMenu) {
    console.log('Botón móvil y menú encontrados.');

    mobileMenuButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      console.log('Menú móvil toggleado.');
    });
  } else {
    console.warn('No se encontró .mobile-menu o nav ul');
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSelector = this.getAttribute('href');
      const target = document.querySelector(targetSelector);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        console.log(`Desplazando a ${targetSelector}`);
      } else {
        console.warn(`No se encontró el destino para el selector: ${targetSelector}`);
      }
    });
  });
});
