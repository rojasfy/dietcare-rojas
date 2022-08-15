let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

/* inicio seccion iconos */

const cajaiconos = document.getElementById("box-iconos");

const dataiconos = [
  {
    icono: "fas fa-user-md",
    numero: "20+",
    titulo: "nutricionistas",
  },
  {
    icono: "fas fa-users",
    numero: "300+",
    titulo: "pacientes satisfechos",
  },
  {
    icono: "fas fa-utensils",
    numero: "900+",
    titulo: "recetas y alimentos",
  },
  {
    icono: "fas fa-store-alt",
    numero: "10+",
    titulo: "tiendas saludables",
  },
];

generarHTMLicon(dataiconos);

function generarHTMLicon(iconos) {
  let generarHTMLicon = "";
  iconos.map((icono) => {
    generarHTMLicon += `
    <div class="icons">
    <i class="${icono.icono}"></i>
    <h3>${icono.numero}</h3>
    <p>${icono.titulo}</p>
  </div>
    `;
  });
  cajaiconos.innerHTML = generarHTMLicon;
}

/* fin seccion iconos */

/* inicio seccion servicios */

const cajaservicios = document.getElementById("box-services");

const dataservicio = [
  {
    icono: "fas fa-notes-medical",
    titulo: "Informes &nbsp;&nbsp;de &nbsp;dietas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-user-md",
    titulo: "Nutricionistas expertos",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-chart-area",
    titulo: "Seguimiento de pacientes",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-pills",
    titulo: "Interacción fármaco-alimento",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-running",
    titulo: "Recomendaciones deportivas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-weight",
    titulo: "basculas inteligentes",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-calendar-alt",
    titulo: "Planificaciones dietéticas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
  {
    icono: "fas fa-shopping-cart",
    titulo: "Lista de &nbsp;la &nbsp;compra",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, omnis.",
  },
];

generarHTMLservi(dataservicio);

function generarHTMLservi(servicios) {
  let generarHTMLservi = "";
  servicios.map((servicio) => {
    generarHTMLservi += `
    <div class="box">
    <i class="${servicio.icono}"></i>
    <h3>${servicio.titulo}</h3>
    <p>
    ${servicio.descripcion}.
    </p>
    <a href="#" class="btn">
      leer más <span class="fas fa-chevron-right"></span>
    </a>
  </div>
    `;
  });
  cajaservicios.innerHTML = generarHTMLservi;
}

/* fin seccion servicios */

/* inicio seccion doctores */

const cajadoctores = document.getElementById("box-doctors");

const datadoctor = [
  {
    imagen: "image/doc-1.jpg",
    nombre: "Jennifer Rojas",
    titulo: "Nutricionista experto",
  },
  {
    imagen: "image/doc-2.jpg",
    nombre: "Freddy Rojas",
    titulo: "Nutricionista experto",
  },
  {
    imagen: "image/doc-3.jpg",
    nombre: "Yoxsbel Limas",
    titulo: "Nutricionista experto",
  },
];

generarHTMLdoc(datadoctor);

function generarHTMLdoc(doctores) {
  let generarHTMLdoc = "";
  doctores.map((doctor) => {
    generarHTMLdoc += `
    <div class="box">
    <img src="${doctor.imagen}" alt="doctor-nutricionista" />
    <h3>${doctor.nombre}</h3>
    <span>${doctor.titulo}</span>
    <div class="share">
      <a href="#" class="fab fa-facebook-f"></a>
      <a href="#" class="fab fa-twitter"></a>
      <a href="#" class="fab fa-instagram"></a>
      <a href="#" class="fab fa-linkedin"></a>
    </div>
  </div>
    `;
  });
  cajadoctores.innerHTML = generarHTMLdoc;
}

/* fin seccion doctores */

/* inicio seccion pacientes */

const cajapacientes = document.getElementById("box-pacientes");

const datapaciente = [
  {
    imagen: "./image/pic-1.png",
    nombre: "Lucas Loccisano",
    rating:
      '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
    comentario:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sapiente nihil aperiam? Repellat sequi nisi aliquid perspiciatis libero nobis rem numquam nesciunt alias sapiente minus voluptatem, reiciendis consequuntur optio dolorem!",
  },
  {
    imagen: "./image/pic-2.png",
    nombre: "majo martino",
    rating:
      '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
    comentario:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sapiente nihil aperiam? Repellat sequi nisi aliquid perspiciatis libero nobis rem numquam nesciunt alias sapiente minus voluptatem, reiciendis consequuntur optio dolorem!",
  },
  {
    imagen: "./image/pic-3.png",
    nombre: "walter queijeiro",
    rating:
      '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ',
    comentario:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sapiente nihil aperiam? Repellat sequi nisi aliquid perspiciatis libero nobis rem numquam nesciunt alias sapiente minus voluptatem, reiciendis consequuntur optio dolorem!",
  },
];

generarHTMLpac(datapaciente);

function generarHTMLpac(pacientes) {
  let generarHTMLpac = "";
  pacientes.map((paciente) => {
    generarHTMLpac += `
    <div class="box">
    <img src="${paciente.imagen}" alt="paciente" />
    <h3>${paciente.nombre}</h3>
    <div class="stars">
    ${paciente.rating}
    </div>
    <p class="text">
    ${paciente.comentario}
    </p>
  </div>
    `;
  });
  cajapacientes.innerHTML = generarHTMLpac;
}

/* fin seccion pacientes */
