(() => {
  const sidebar = document.getElementById('sidebarPrincipal');
  const overlay = document.getElementById('mobileOverlay');
  const abrir = document.getElementById('btnAbrirMenu');
  const fechar = document.getElementById('btnFecharMenu');

  if (!sidebar || !overlay || !abrir || !fechar) return;

  const abrirMenu = () => {
    sidebar.classList.add('aberta');
    overlay.classList.add('aberto');
    abrir.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const fecharMenu = () => {
    sidebar.classList.remove('aberta');
    overlay.classList.remove('aberto');
    abrir.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  abrir.addEventListener('click', abrirMenu);
  fechar.addEventListener('click', fecharMenu);
  overlay.addEventListener('click', fecharMenu);

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1200) fecharMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fecharMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) fecharMenu();
  });
})();
