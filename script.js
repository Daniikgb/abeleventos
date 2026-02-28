document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // No unobserve to allow re-animation if desired, 
                // but usually for premium fee we keep it visible
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Navigation Scroll Effect
    const nav = document.querySelector('nav');
    const updateNav = () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateNav);
    updateNav(); // Initial check

    // 3. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Direct WhatsApp Reservation (Omit the 'Tramite')
    const form = document.getElementById('premium-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[type="text"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const date = form.querySelector('input[type="date"]').value;
            const service = form.querySelector('select').value;
            const msg = form.querySelector('textarea').value;

            const whatsappMsg = `Hola Abel Eventos, me gustaría solicitar disponibilidad:\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Fecha estimada:* ${date}\n*Tipo de Gala:* ${service}\n*Mensaje:* ${msg}`;

            const encodedMsg = encodeURIComponent(whatsappMsg);
            const whatsappUrl = `https://wa.me/595973513782?text=${encodedMsg}`;

            // Visual feedback before redirect
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'ABRIENDO WHATSAPP...';
            btn.style.background = '#25d366';

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.disabled = false;
                btn.textContent = originalText;
                btn.style.background = '';
            }, 800);
        });
    }

    // 5. Parallax Hero Media
    const heroMedia = document.querySelector('.hero-media');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroMedia) {
            heroMedia.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.4}px))`;
        }
    });
});
