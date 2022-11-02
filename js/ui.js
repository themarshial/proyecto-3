//import { surveys } from "../db.json";

let containers = document.querySelectorAll(".contenedor");
let survey = {};

const arrayFunctions = [
  function () {
    //empty function
  },
  function () {
    let name = document.getElementById("name").value;
    survey.name = name;
  },
  function () {
    let edad = document.getElementById("respuestaEdad").value;
    survey.age = edad;
  },
  function () {
    let country = document.getElementById("country").innerText;
    survey.country = country;
  },
  function () {
    let radioWindows = document.getElementById("windows");
    let radioMac = document.getElementById("mac");
    let linux = document.getElementById("linux");
    if (radioWindows.checked) {
      survey.so = "windows";
    }
    if (radioMac.checked) {
      survey.so = "Mac";
    }
    if (linux.checked) {
      survey.so = "linux";
    }
  },
  function () {
    let respuestaHtml = document.getElementById("respuesta1");
    let respuestaCss = document.getElementById("respuesta2");
    let respuestaJavascript = document.getElementById("respuesta3");
    let respuestaArrays = document.getElementById("respuesta4");
    let respuestaDom = document.getElementById("respuesta5");
    let respuestaFunciones = document.getElementById("respuesta6");
    let respuestaObjetos = document.getElementById("respuesta7");
    let respuestaPromesas = document.getElementById("respuesta8");

    let ArregloRespuestas = [];
    if (respuestaHtml.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaHtml.checked) ArregloRespuestas.push(0);
    //
    if (respuestaCss.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaCss.checked) ArregloRespuestas.push(0);
    //
    if (respuestaJavascript.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaJavascript.checked) ArregloRespuestas.push(0);
    //
    if (respuestaArrays.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaArrays.checked) ArregloRespuestas.push(0);
    //
    if (respuestaDom.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaDom.checked) ArregloRespuestas.push(0);
    //
    if (respuestaFunciones.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaFunciones.checked) ArregloRespuestas.push(0);
    //
    if (respuestaObjetos.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaObjetos.checked) ArregloRespuestas.push(0);
    //
    if (respuestaPromesas.checked) {
      ArregloRespuestas.push(1);
    } else if (!respuestaPromesas.checked) ArregloRespuestas.push(0);

    survey.dificult_topics = ArregloRespuestas;
  },
];

document.querySelectorAll(".btn-ir").forEach((boton, index) => {
  boton.addEventListener("click", () => {
    containers[index].classList.add("hidden");
    containers[index + 1].classList.remove("hidden");
    arrayFunctions[index]();
    console.log(survey);
  });
});

/*
function saveData() {
  let surveyJSON = JSON.stringify(survey);
  var fs = require("fs");
  fs.writeFile("db.json", surveyJSON, function (err, result) {
    if (err) console.log("error", err);
  });
}
*/