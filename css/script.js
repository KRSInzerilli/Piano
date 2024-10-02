document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll("nav a");

  // Establecer la opacidad inicial de las secciones
  gsap.set(sections, { opacity: 0.5 }); // Todas las secciones son semi-transparentes
  gsap.set(sections[0], { opacity: 1 }); // La primera sección es completamente visible

  // Evento de clic para cada enlace de navegación
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      gsap.to(window, {
        duration: 1,
        scrollTo: targetId,
        ease: "power2.inOut",
      });
    });
  });

  // Escuchar el evento de scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Verificar si la sección está en el viewport
      if (
        scrollPosition >= sectionOffsetTop - sectionHeight / 2 &&
        scrollPosition < sectionOffsetTop + sectionHeight / 2
      ) {
        // La sección visible se aclara
        gsap.to(section, { opacity: 1, duration: 0.5 }); // Mostrar completamente
        section.classList.add("active"); // Añadir clase activa
      } else {
        // La sección oculta se oscurece
        gsap.to(section, { opacity: 0.3, duration: 0.5 }); // Cambiar a una opacidad más baja
        section.classList.remove("active"); // Quitar clase activa
      }
    });
  });
});
// Inicializa EmailJS
emailjs.init("UjCoeUFpgbLWaeqxu"); // Tu User ID

// Manejo del evento de envío del formulario
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío tradicional del formulario

  // Cambia el botón a "Enviando..."
  const btn = document.getElementById("button");
  btn.value = "Enviando...";

  const serviceID = "service_75qioqw"; // Tu Service ID
  const templateID = "template_55hz5lk"; // Tu Template ID

  // Envía el formulario
  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Enviar Email"; // Restablece el botón
      alert("¡Mensaje enviado correctamente!");
      document.getElementById("form").reset(); // Opcional: Reinicia el formulario
    },
    (err) => {
      btn.value = "Enviar Email"; // Restablece el botón
      alert("Error al enviar: " + JSON.stringify(err));
    }
  );
});
