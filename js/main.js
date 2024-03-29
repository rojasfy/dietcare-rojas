//Uso de libreria página inicio boton contactanos

const contactanos = document.getElementById("contactanos");

contactanos.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    input: "text",
    confirmButtonText: "Enviar",
    showCancelButton: true,
    title: "Escribe tu correo",
    width: 400,
    padding: "2em",
    color: "#16a085",
    background: "#f5f5f5;",
    confirmButtonColor: "#16a085",
    cancelButtonColor: "#444",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: "¡Tu correo fue recibido!",
        html:
          "Pronto te contactaremos al correo: <pre><code>" +
          JSON.stringify(result.value) +
          "</code></pre>",
        confirmButtonText: "Ok",
      });
    }
  });
});

// Formulario de Solicitud de cita (evento: "submit")

const formulario = document.getElementById("formCita");
const inputs = document.querySelectorAll("#formCita input");

const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  number: /^\d{7,14}$/, // 7 a 14 numeros.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  datetime:
    /^((?:[0-9]{2})?[0-9]{2})\-(1[0-2]|0?[1-9])\-(3[01]|[12][0-9]|0?[1-9])T(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
};

const campos = {
  name: false,
  number: false,
  email: false,
  datetime: false,
};

const validarSolicitudcita = (e) => {
  console.log(e.target);
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, "name");
      break;
    case "number":
      validarCampo(expresiones.number, e.target, "number");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "datetime":
      validarCampo(expresiones.datetime, e.target, "datetime");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`cita__${campo}`)
      .classList.remove("solicitud__cita-incorrecto");
    document
      .getElementById(`cita__${campo}`)
      .classList.add("solicitud__cita-correcto");
    document
      .querySelector(`#cita__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#cita__${campo} i`)
      .classList.remove("fa-times-circle");
    document.getElementById(`${campo}`).classList.remove("box-incorrecto");
    document.getElementById(`${campo}`).classList.add("box");
    document
      .querySelector(`#cita__${campo} .solicitud__input-error`)
      .classList.remove("solicitud__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`cita__${campo}`)
      .classList.add("solicitud__cita-incorrecto");
    document
      .getElementById(`cita__${campo}`)
      .classList.remove("solicitud__cita-correcto");
    document
      .querySelector(`#cita__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#cita__${campo} i`)
      .classList.remove("fa-check-circle");
    document.getElementById(`${campo}`).classList.add("box-incorrecto");
    document.getElementById(`${campo}`).classList.remove("box");
    document
      .querySelector(`#cita__${campo} .solicitud__input-error`)
      .classList.add("solicitud__input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarSolicitudcita);
  input.addEventListener("blur", validarSolicitudcita);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let nombre = document.getElementById("name").value;
  let telefono = document.getElementById("number").value;
  let correo = document.getElementById("email").value;
  let fechayHora = document.getElementById("datetime").value;

  if (campos.name && campos.number && campos.email && campos.datetime) {
    formulario.reset();

    document
      .getElementById("solicitud__mensaje-exito")
      .classList.add("solicitud__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("solicitud__mensaje-exito")
        .classList.remove("solicitud__mensaje-exito-activo");
    }, 5000);

    document.querySelectorAll(".solicitud__cita-correcto").forEach((icono) => {
      icono.classList.remove("solicitud__cita-correcto");
    });

    addcita(nombre, telefono, correo, fechayHora);
    mensajecita();

    function mensajecita() {
      let lista = getlistacita();
      console.log(lista);
      const div = document.createElement("div");
      div.innerHTML = " ";

      for (let i = 0; i < lista.length; i++) {
        div.innerHTML = `<div id="cita" class="box4 "><h4 >Buen día! Sr(a).<span>${lista[
          i
        ].paciente.toUpperCase()},</span> su turno de atención es: <span>${
          lista[i].fechaCita
        },</span> se agradece puntual asistencia.</h4></div>`;
        formulario.appendChild(div);

        formulario.addEventListener("change", borrar);
        function borrar() {
          return (div.innerHTML = " ");
        }
      }
    }
  } else {
    document
      .getElementById("solicitud__mensaje")
      .classList.add("solicitud__mensaje-activo");
    setTimeout(() => {
      document
        .getElementById("solicitud__mensaje")
        .classList.remove("solicitud__mensaje-activo");
    }, 3000);
  }
});

// Calculadora de IMC y Calorias (evento: "click")

let boton = document.getElementById("btnCalc");
boton.addEventListener("click", calculo_IMC_Caloria);

function calculo_IMC_Caloria() {
  let edad = document.querySelector("input[name=age]").value;
  let genero = document.querySelector("input[name=gender]:checked").value;
  let altura = document.querySelector("input[name=height]").value;
  let peso = document.querySelector("input[name=weight]").value;
  let grasacorp = document.querySelector("input[name=bodyFat]").value;
  let actividad = document.querySelector("select[name=activity]").value;
  let unidad = document.querySelector("input[name=unit]:checked").value;
  let formula = document.querySelector("input[name=formula]:checked").value;

  let IMC = CalculoIMC(peso, altura);

  console.log(IMC);

  const dataIMC = [
    {
      resIMC: "peso mas bajo de lo normal",
      sugerencia: "aumentar",
      consumo: "mayor",
      recomendacion: ".",
    },
    {
      resIMC: "peso normal",
      sugerencia: "mantener",
      consumo: "igual",
      recomendacion: ".",
    },
    {
      resIMC: "sobrepeso grado I",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion: ".",
    },
    {
      resIMC: "sobrepeso grado II",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion: ".",
    },
    {
      resIMC: "obesidad  tipo I",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion:
        ", se recomienda <span>visitar el centro de nutrición Dietcare</span> y realizar alguna actividad física.",
    },
    {
      resIMC: "obesidad  tipo II",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion:
        ", se recomienda <span>visitar el centro de nutrición Dietcare</span> y realizar alguna actividad física.",
    },
    {
      resIMC: "obesidad  tipo III (mórbida)",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion:
        ", se recomienda <span>visitar al médico</span> para evaluar su estado de salud .",
    },
    {
      resIMC: "obesidad  tipo IV (extrema)",
      sugerencia: "bajar",
      consumo: "menor",
      recomendacion:
        ", se recomienda con <span>urgencia visitar al médico</span> para evaluar su estado de salud.",
    },
  ];

  console.log(dataIMC);

  let mensajeIMC = "";

  if (IMC < 18.5) {
    mensajeIMC = dataIMC[0];
  } else if (IMC == 18.5 || IMC < 24.9) {
    mensajeIMC = dataIMC[1];
  } else if (IMC == 24.9 || IMC < 26.9) {
    mensajeIMC = dataIMC[2];
  } else if (IMC == 26.9 || IMC < 29.9) {
    mensajeIMC = dataIMC[3];
  } else if (IMC == 29.9 || IMC < 34.9) {
    mensajeIMC = dataIMC[4];
  } else if (IMC == 34.9 || IMC < 39.9) {
    mensajeIMC = dataIMC[5];
  } else if (IMC == 39.9 || IMC < 49.9) {
    mensajeIMC = dataIMC[6];
  } else if (IMC >= 49.9) {
    mensajeIMC = dataIMC[7];
  }

  console.log(mensajeIMC);

  let TMB = "";
  if (formula == 0) {
    // Mifflin
    TMB = Mifflin(genero, edad, altura, peso);
  } else if (formula == 1) {
    // Harris
    TMB = Harris(genero, edad, altura, peso);
  } else if (formula == 2) {
    // Katch
    TMB = Katch(grasacorp, peso);
  }

  let ret = parseFloat(TMB) * parseFloat(actividad);
  if (unidad == "kilojoules") {
    ret = ret * 4.1868;
  }

  document.querySelector(
    ".ans_calculate"
  ).innerHTML = `<div class="box4 "><h4 >Tu IMC es de: <span> ${IMC}</span>, que indica un estado de <span>${
    mensajeIMC.resIMC
  }</span>, su cuerpo  consume <span> ${Math.ceil(
    ret
  )} ${unidad} </span> diarias, si desea <span>${
    mensajeIMC.sugerencia
  }</span> de  peso debe consumir al día un numero <span>${
    mensajeIMC.consumo
  }</span> de ${unidad} ${mensajeIMC.recomendacion}</h4></div>`;
}

function Mifflin(genero, edad, altura, peso) {
  let TMB = 10 * peso + 6.25 * altura - 5 * edad + 5;
  if (genero == 1) {
    // Femenino
    TMB = 10 * peso + 6.25 * altura - 5 * edad - 161;
  }

  return TMB;
}

function Harris(genero, edad, altura, peso) {
  let TMB = 13.397 * peso + 4.799 * altura - 5.677 * edad + 88.362;
  if (genero == 1) {
    // Femenino
    TMB = 9.247 * peso + 3.098 * altura - 4.33 * edad + 447.593;
  }

  return TMB;
}

function Katch(grasacorp, peso) {
  let TMB = 370 + 21.6 * (1 - grasacorp / 100) * peso;

  return TMB;
}

function CalculoIMC(peso, altura) {
  let imc = Math.round((peso / (altura * altura)) * 10) / 10;
  return imc;
}

// uso de API de recetas y sus calorias

const busquedaForm = document.getElementById("busqueda");
const busquedaResultDiv = document.querySelector(".busqueda-receta");
const recetario = document.querySelector(".recetario");
let busquedaQuery = "";
const APP_ID = "1565b1a9";
const APP_key = "04833c853463be502a42c56c425c78fa";
// console.log(recetario)
busquedaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  busquedaQuery = e.target.querySelector("input").value;
  console.log(busquedaQuery);
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${busquedaQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  generarHTML(data.hits);
  console.log(data.hits);
}

function generarHTML(results) {
  let generarHTML = "";
  results.map((result) => {
    generarHTML += `
      <div class="articulo">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-recetario">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">Ver receta</a>
        </div>
        <p class="articulo-data-cal"><span>Calorias:</span> ${result.recipe.calories.toFixed(
          2
        )}</p>
        <p class="articulo-data"><span>Etiqueta de Dieta:</span> ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "Datos no encontrados"
        }</p>
        <p class="articulo-data"><span>Etiqueta de Salud:</span>${
          result.recipe.healthLabels
        }</p>
      </div>
    `;
  });
  busquedaResultDiv.innerHTML = generarHTML;
}

//Primeros desafios realizados:

/* Calculo de IMC y cantidad de calorias diarias consumidas en reposo */

/* alert('¡Bienvenidos al Centro de Nutrición Dietcare! \n Para un plan dietético personalizado, por favor ingrese los  datos que solicitamos a continuación:')
alert("Para indicar datos con decimales utilizar el punto ( . ) , Ejemplo: 83.8") */

/* class Paciente {
    constructor(nombre, peso, altura, edad, genero) {  //objeto de JS
        this.nombre = nombre.toUpperCase();
        this.peso = peso;
        this.altura = altura;
        this.edad = edad;
        this.genero = genero;
    }
    calcularIMC() {  //funcion
        //variables
        let imc = Math.round(this.peso / (this.altura * this.altura) * 10) / 10; 
        let seleccion = prompt("Seleccionar actividad diaria \n 1 -Poco o ningún ejercicio \n 2 -  Ejercicio ligero (1 a 3 días a la semana) \n 3 -  Ejercicio moderado (3 a 5 días a la semana) \n 4 -  Deportista (6 -7 días a la semana) \n 5 -  Atleta (Entrenamientos mañana y tarde)");
        let TMBh = Math.round((66 + (13.7 * this.peso) + (5 * this.altura * 100) - (6.75 * this.edad)) * 10) / 10; //tasa metabolica basal hombre
        let TMBm = Math.round((655 + (9.6 * this.peso) + (1.8 * this.altura * 100) - (4.7 * this.edad)) * 10) / 10; // tasa metabolica basal mujer

        if ((imc < 18.5) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBh} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBh} calorias`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBh} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBh} calorias`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBh} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBh} calorias`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBh} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBh} calorias`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBh} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 18.5) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBm} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBm} calorias`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBm} calorias diarias , si desea aumentar de peso debe consumir al día un numero mayor de ${TMBm} calorias`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBm} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBm} calorias`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBm} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBm} calorias`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  bajo peso, su cuerpo consume ${TMBm} calorias diarias, si desea aumentar de peso debe consumir al día un numero mayor de ${TMBm} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 24.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBh} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBh} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBh} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(` Sr. ${this.nombre} suIMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBh} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBh} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 24.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo consume ${TMBm} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo consume ${TMBm} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo  consume ${TMBm} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo consume ${TMBm} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de peso normal, su cuerpo consume ${TMBm} calorias diarias, si desea mantener su  peso debe consumir al día un numero igual a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 26.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 26.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 29.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 29.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de sobrepeso grado II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 34.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 34.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo I, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 39.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 39.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo II, su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar un nutricionista y realizar alguna actividad física`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 49.9) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc < 49.9) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo III (mórbida), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda visitar al médico para evaluar su estado de salud`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc > 50) && (this.genero == 1)) {
            switch (seleccion) {
                case "1":
                    TMBh = Math.round(TMBh * 1.2 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "2":
                    TMBh = Math.round(TMBh * 1.375 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "3":
                    TMBh = Math.round(TMBh * 1.55 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "4":
                    TMBh = Math.round(TMBh * 1.72 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "5":
                    TMBh = Math.round(TMBh * 1.9 * 10) / 10
                    alert(`Sr. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBh} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                default:
                    alert("Error");
                    break;
            }

        } else if ((imc > 50) && (this.genero == 2)) {
            switch (seleccion) {
                case "1":
                    TMBm = Math.round(TMBm * 1.2 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "2":
                    TMBm = Math.round(TMBm * 1.375 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "3":
                    TMBm = Math.round(TMBm * 1.55 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo  consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "4":
                    TMBm = Math.round(TMBm * 1.72 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                case "5":
                    TMBm = Math.round(TMBm * 1.9 * 10) / 10
                    alert(`Sra. ${this.nombre} su IMC es de: ${imc} que indica un estado  de obesidad  tipo IV (extrema), su cuerpo consume ${TMBm} calorias diarias, si desea bajar de  peso debe consumir al día un numero menor a ${TMBh} calorias, se recomienda con urgencia visitar al médico para evaluar su estado de salud`);
                    break;
                default:
                    alert("Error");
                    break;
            }
        }
    }
}
 */

/* let paciente = new Paciente(prompt("Indique su nombre"),
    parseFloat(prompt("Indique su peso en Kg")),
    parseFloat(prompt("Indique su altura en mts")),
    parseFloat(prompt("Indique su edad en años")),
    parseFloat(prompt("Seleccionar genero \n 1 - Masculino \n 2 -  Femenino ")));


paciente.calcularIMC(); */

// Array

/*     let pacientes = [];
    pacientes.push(new Paciente("Freddy", 82 , 1.73, 42, "masculino"));
    pacientes.push(new Paciente("Yoxsbel", 70 , 1.70, 41,"masculino"));
    pacientes.push(new Paciente("Daniela", 55 , 1.53, 32,"femenino" ));
    pacientes.push(new Paciente("Lucia", 92 , 1.63, 42,"femenino"));
    pacientes.push(new Paciente("Jesus", 102 , 1.85, 33,"masculino" ));
    
    console.log(pacientes) */

// Metodo de Busqueda

/*     function buscarPaciente(grupo, persona){
        return grupo.find(objeto => objeto.nombre === persona.toUpperCase());
    }
    for (let index = 0; index < 3; index++) {
        let busqueda = buscarPaciente(pacientes, prompt('INGRESAR NOMBRE DE PACIENTE'));
        if(busqueda != undefined){
            console.log(busqueda)
            alert('Paciente: '+ busqueda.nombre+' Peso: '+ busqueda.peso+' Altura: '+ busqueda.altura+' Edad:'+ busqueda.edad+' Genero:'+ busqueda.genero);
        }else{
            alert('NO EXISTE CLIENTE CON ESE NOMBRE');
        }
    }
     */

// Metodo de Filtrado

/*     function filtroPaciente(grupo, edad) {
        return grupo.filter(objeto => objeto.edad == parseInt(edad));
    }
    function listaPacientes(pacientes) {
        let lista = '';
        for (const paciente of pacientes) {
            lista += 'Paciente ' + paciente.nombre + ' Peso: ' + paciente.peso + ' Edad: ' + paciente.edad + '\n'
        }
        return lista;
    }
    for (let index = 0; index < 5; index++) {
        let filtro = filtroPaciente(pacientes, prompt('INGRESAR EDAD DE PACIENTE'));
        if (filtro.length > 0) {
            console.log(filtro)
            alert(listaPacientes(filtro));
        } else {
            alert('NO existe Paciente con esa Edad');
        }
    } */
