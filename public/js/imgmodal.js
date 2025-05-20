// Sistema de visor modal con animación para galería dinámica
// Inicializar los elementos del modal una vez al cargar la página
document.addEventListener("DOMContentLoaded", () => {
	// Crear los elementos del modal si no existen
	if (!document.querySelector(".modal-overlay-animated")) {
		// Crear el overlay modal
		const modalOverlay = document.createElement("div");
		modalOverlay.className = "modal-overlay-animated";
		modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      display: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

		// Crear la imagen del modal
		const modalImg = document.createElement("img");
		modalImg.className = "modal-img-animated";
		modalImg.style.cssText = `
      position: fixed;
      transition: all 0.4s ease;
      z-index: 1001;
      max-width: 100%;
      max-height: 100%;
    `;

		// Crear el contenedor para el texto/pie de foto
		const modalText = document.createElement("div");
		modalText.className = "modal-text-animated";
		modalText.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 20px;
      color: #000;
      text-align: center;
      z-index: 1002;
      opacity: 0;
      transition: opacity 0.5s ease;
      background-color: rgba(255, 255, 255, 0.9);
    `;

		// Añadir elementos al DOM
		modalOverlay.appendChild(modalImg);
		modalOverlay.appendChild(modalText);
		document.body.appendChild(modalOverlay);

		// Cerrar el modal al hacer clic en cualquier parte
		modalOverlay.addEventListener("click", () => {
			// Obtener la figura que originalmente fue clicada
			const clickedFigure = window.lastClickedFigure;

			if (clickedFigure) {
				const thumbnailImg = clickedFigure.querySelector(".pig-thumbnail");
				if (thumbnailImg) {
					const thumbnailRect = thumbnailImg.getBoundingClientRect();

					// Animar de vuelta al tamaño del thumbnail
					modalImg.style.top = thumbnailRect.top + "px";
					modalImg.style.left = thumbnailRect.left + "px";
					modalImg.style.width = thumbnailRect.width + "px";
					modalImg.style.height = thumbnailRect.height + "px";

					// Ocultar el texto
					modalText.style.opacity = 0;
				}
			}

			// Desvanecer el overlay
			modalOverlay.style.opacity = 0;

			// Ocultar el overlay después de la animación
			setTimeout(() => {
				modalOverlay.style.display = "none";
				document.body.style.overflowY = "auto"; // Restaurar el scroll
			}, 400);
		});

		// Detectar cambios en el tamaño de la ventana
		window.addEventListener("resize", () => {
			if (modalOverlay.style.display === "block") {
				// Si el modal está abierto, ajustar la posición
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;

				// Obtener dimensiones actuales de la imagen
				const imgWidth = parseFloat(modalImg.style.width);
				const imgHeight = parseFloat(modalImg.style.height);

				// Reposicionar la imagen centrada
				modalImg.style.top = `${(windowHeight - imgHeight) / 2}px`;
				modalImg.style.left = `${(windowWidth - imgWidth) / 2}px`;
			}
		});
	}
});

// Función que reemplazará a tu onClickHandler actual
function mostrarImagenConAnimacion(filename, figure, pieFoto) {
	// Guardar referencia a la figura clicada
	window.lastClickedFigure = figure;

	// Obtener referencias a los elementos del modal
	const modalOverlay = document.querySelector(".modal-overlay-animated");
	const modalImg = document.querySelector(".modal-img-animated");
	const modalText = document.querySelector(".modal-text-animated");

	if (!modalOverlay || !modalImg || !modalText) {
		console.error("Los elementos del modal no están disponibles");
		return;
	}

	// Obtener la imagen thumbnail y su posición
	const thumbnailImg = figure.querySelector(".pig-thumbnail.pig-loaded");
	if (!thumbnailImg) {
		console.error("No se encontró la imagen thumbnail");
		return;
	}

	const thumbnailRect = thumbnailImg.getBoundingClientRect();

	// Obtener la imagen de resolución media
	const mediumImg = figure.querySelector("img:not(.pig-thumbnail)");
	if (!mediumImg) {
		console.error("No se encontró la imagen de resolución media");
		return;
	}

	// Construir la URL de la imagen a tamaño completo
	const fullImgUrl = mediumImg.src.replace("/250/", "/full/");

	// Configurar la imagen del modal con la posición inicial igual a la del thumbnail
	modalImg.style.top = thumbnailRect.top + "px";
	modalImg.style.left = thumbnailRect.left + "px";
	modalImg.style.width = thumbnailRect.width + "px";
	modalImg.style.height = thumbnailRect.height + "px";

	// Establecer el src a la imagen mediana inicialmente para una carga más rápida
	modalImg.src = mediumImg.src;

	// Configurar el texto del modal
	if (pieFoto) {
		modalText.innerHTML = `<div class='fs-2'>${pieFoto}</div>`;
	} else {
		modalText.innerHTML = "";
	}

	// Mostrar el overlay
	modalOverlay.style.display = "block";
	document.body.style.overflowY = "hidden"; // Deshabilitar scroll

	// Forzar un reflow para que la transición funcione
	void modalOverlay.offsetWidth;

	// Hacer visible el overlay
	modalOverlay.style.opacity = 1;

	// Establecer la posición y tamaño finales para la animación
	setTimeout(() => {
		// Calcular dimensiones para centrar la imagen
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Crear una imagen temporal para obtener las dimensiones reales
		const tempImg = new Image();
		tempImg.onload = function () {
			// Calcular el tamaño que tendrá la imagen manteniendo la proporción
			const imgRatio = this.width / this.height;
			let newWidth, newHeight;

			if (windowWidth / windowHeight > imgRatio) {
				// La ventana es más ancha que la proporción de la imagen
				newHeight = Math.min(windowHeight * 0.9, this.height);
				newWidth = newHeight * imgRatio;
			} else {
				// La ventana es más alta que la proporción de la imagen
				newWidth = Math.min(windowWidth * 0.9, this.width);
				newHeight = newWidth / imgRatio;
			}

			// Posicionar la imagen centrada
			modalImg.style.top = `${(windowHeight - newHeight) / 2}px`;
			modalImg.style.left = `${(windowWidth - newWidth) / 2}px`;
			modalImg.style.width = `${newWidth}px`;
			modalImg.style.height = `${newHeight}px`;

			// Cambiar a la imagen de alta resolución después de la animación
			setTimeout(() => {
				modalImg.src = fullImgUrl;

				// Mostrar el texto después de que la imagen esté posicionada
				modalText.style.opacity = 1;
			}, 300);
		};

		// Iniciar la carga de la imagen temporal
		tempImg.src = fullImgUrl;
	}, 50);
}
