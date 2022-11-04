/* export let survey = {}; */

import * as DB from "./db.js";

let containers = document.querySelectorAll(".contenedor");

const validateMessages = [
  "",
  "Debe escribir un nombre",
  "Debe escribir su edad",
  "Debe seleccionar un país",
  "Seleccione un sistema operativo",
  "Debe seleccionar al menos un tema",
];

const displayValidateMessage = (message, msgIndex) => {
  document.querySelectorAll(".validate-message")[msgIndex].innerHTML = message;
  setTimeout(() => {
    document.querySelectorAll(".validate-message")[msgIndex].innerHTML = "";
  }, 1500);
};

const validateFunctions = [
  function () {
    return true;
  },
  function () {
    return document.getElementById("name").value === "" ? false : true;
  },
  function () {
    return document.getElementById("age").value === "" ? false : true;
  },
  function () {
    return document.getElementById("country").value === "" ? false : true;
  },
  function () {
    return Array.from(document.querySelectorAll(".sist_op")).reduce(
      (acc, el) => {
        return acc || el.checked;
      },
      false
    )
      ? true
      : false;
  },
  function () {
    return Array.from(document.querySelectorAll(".topics")).reduce(
      (acc, el) => {
        return acc || el.checked;
      },
      false
    )
      ? true
      : false;
  },
];

export const buildSurveyObject = () => {
  let survey = {};
  survey.dificult_topics = [];
  survey.name = document.getElementById("name").value;
  survey.age = document.getElementById("age").value;
  survey.country = document.getElementById("country").value;
  document.querySelectorAll(".sist_op").forEach((radio) => {
    if (radio.checked) {
      survey.so = radio.value;
      return;
    }
  });
  document.querySelectorAll(".topics").forEach((topic) => {
    topic.checked
      ? survey.dificult_topics.push(1)
      : survey.dificult_topics.push(0);
  });
  return survey;
};

export const manageQuestions = () => {
  document.querySelectorAll(".next").forEach((boton, index) => {
    boton.addEventListener("click", () => {
      if (validateFunctions[index]()) {
        containers[index].classList.add("hidden");
        if (index + 1 <= containers.length)
          containers[index + 1].classList.remove("hidden");
      } else {
        displayValidateMessage(validateMessages[index], index);
      }
    });
  });
};

export const showResults = () => {
  document.querySelectorAll(".contenedor").forEach((e) => {
    e.classList.add("hidden");
  });
  document.getElementById("idGraficas").classList.remove("hidden");
};
