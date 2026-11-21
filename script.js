document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Responsivo (Hamburguesa en móviles)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('bx-menu');
            icon.classList.toggle('bx-x');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.add('bx-menu');
                icon.classList.remove('bx-x');
            });
        });
    }

    // 3. Resaltado activo en navegación al hacer scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    });

    // 4. Autocompletar servicio al hacer clic en "Solicitar servicio" de una tarjeta
    const serviceLinks = document.querySelectorAll('.service-link[data-service]');
    const serviceSelect = document.getElementById('servicio');

    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const selectedService = link.getAttribute('data-service');
            if (serviceSelect && selectedService) {
                serviceSelect.value = selectedService;
            }
        });
    });

    // 5. Filtrado interactivo de Galería
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 6. Lightbox (Vista ampliada de imágenes de galería)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            lightboxImg.src = img.src;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 7. Cotizador Directo por WhatsApp y Correo
    const quoteForm = document.getElementById('quote-form');
    const btnEmailQuote = document.getElementById('btn-email-quote');
    const feedback = document.getElementById('form-feedback');

    function getFormData() {
        return {
            nombre: document.getElementById('nombre').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            servicio: document.getElementById('servicio').value,
            urgencia: document.getElementById('urgencia').value,
            ubicacion: document.getElementById('ubicacion').value.trim(),
            detalles: document.getElementById('detalles').value.trim() || 'Sin comentarios adicionales'
        };
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getFormData();

            const mensaje = `Hola *Pipas Medina's*, solicito una cotización:%0A%0A` +
                `👤 *Nombre:* ${encodeURIComponent(data.nombre)}%0A` +
                `📞 *Teléfono:* ${encodeURIComponent(data.telefono)}%0A` +
                `🚛 *Servicio:* ${encodeURIComponent(data.servicio)}%0A` +
                `⚡ *Prioridad:* ${encodeURIComponent(data.urgencia)}%0A` +
                `📍 *Ubicación:* ${encodeURIComponent(data.ubicacion)}%0A` +
                `📝 *Detalles:* ${encodeURIComponent(data.detalles)}`;

            const whatsappUrl = `https://wa.me/5213221053132?text=${mensaje}`;
            feedback.textContent = 'Redirigiendo a WhatsApp con tu cotización...';
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }

    if (btnEmailQuote) {
        btnEmailQuote.addEventListener('click', () => {
            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }
            const data = getFormData();
            const subject = encodeURIComponent(`Cotización ${data.servicio} - ${data.nombre}`);
            const body = encodeURIComponent(
                `Hola Pipas Medina's,\n\nSolicito cotización con los siguientes datos:\n` +
                `- Nombre: ${data.nombre}\n` +
                `- Teléfono: ${data.telefono}\n` +
                `- Servicio: ${data.servicio}\n` +
                `- Prioridad: ${data.urgencia}\n` +
                `- Ubicación: ${data.ubicacion}\n` +
                `- Detalles: ${data.detalles}\n\nQuedo atento a su respuesta.`
            );

            feedback.textContent = 'Abriendo tu cliente de correo...';
            window.location.href = `mailto:desazolvesmedinas@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});