// ─────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('section');
    const current = Math.round(window.scrollY / window.innerHeight);

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const next = Math.min(current + 1, sections.length - 1);
        sections[next].scrollIntoView({ behavior: 'smooth' });
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(current - 1, 0);
        sections[prev].scrollIntoView({ behavior: 'smooth' });
    }
});

// ─────────────────────────────────────────────────────────────────────
// Animation Observer
// ─────────────────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

// ─────────────────────────────────────────────────────────────────────
// Restart Function
// ─────────────────────────────────────────────────────────────────────
function restartPresentation() {
    // Reset all animations
    document.querySelectorAll('.anim').forEach(el => {
        el.classList.remove('visible');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger first section animations after scroll
    setTimeout(() => {
        document.querySelectorAll('section:first-of-type .anim').forEach(el => {
            el.classList.add('visible');
        });
    }, 500);
}
