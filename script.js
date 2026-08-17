const nav = document.querySelector('.nav');
if (nav && !nav.querySelector('a[href="cv.html"]')) {
  const cvLink = document.createElement('a');
  cvLink.href = 'cv.html';
  cvLink.textContent = 'CV';
  const githubLink = nav.querySelector('.nav-github');
  nav.insertBefore(cvLink, githubLink || null);
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions && !heroActions.querySelector('a[href="cv.html"]')) {
  const cvButton = document.createElement('a');
  cvButton.className = 'button button-ghost';
  cvButton.href = 'cv.html';
  cvButton.textContent = 'View academic CV';
  heroActions.appendChild(cvButton);
}

const aboutLinks = document.querySelector('.about-links');
if (aboutLinks && !aboutLinks.querySelector('a[href="cv.html"]')) {
  const cvLink = document.createElement('a');
  cvLink.href = 'cv.html';
  cvLink.textContent = 'Academic CV →';
  aboutLinks.appendChild(cvLink);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach((item) => observer.observe(item));
}

const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    sectionLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.toggleAttribute('aria-current', active);
    });
  }, { threshold: [0.18, 0.35, 0.55], rootMargin: '-15% 0px -55%' });

  sections.forEach((section) => navObserver.observe(section));
}
