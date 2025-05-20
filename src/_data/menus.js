export const menuPpal = {
	items: [
		{ text: "Inicio", slug: "/" },
		{
			text: "Conócenos",
			slug: "conocenos",
			dropdown: [
				{ text: "Quienes somos", slug: "yolanda-martinez" },
				{ text: "Nuestra vocación", slug: "nuestra-vocacion" },
			],
		},
		{
			text: "Servicios",
			slug: "servicios",
			dropdown: [
				{ text: "Cuidado de niños", slug: "cuidado-de-ninos" },
				{ text: "Cuidado de mayores", slug: "cuidado-de-mayores" },
				{
					text: "Acompañamiento hospitalario",
					slug: "acompanamiento-hospitalario",
				},
				{ text: "Labores domésticas", slug: "labores-domesticas" },
				{ text: "Internas las 24h", slug: "internas-las-24h" },
				{ text: "Tramitación ayuda", slug: "tramitacion-ayuda" },
			],
		},
		{
			text: "Trabaja con nosotros",
			slug: "trabaja-con-nosotros",
		},
		{ text: "Blog", slug: "blog" },
		{ text: "Contacto", slug: "contacto" },
	],
};

export const menuPie = {
	items: [
		{ text: "Ayuda a domicilio", slug: "ayuda-a-domicilio" },
		{ text: "Aviso Legal", slug: "aviso-legal" },
		{ text: "Política de privacidad", slug: "politica-de-privacidad" },
		{ text: "Uso de cookies", slug: "uso-de-cookies" },
		{ text: "Mapa del sitio", slug: "mapa-del-sitio" },
	],
};
