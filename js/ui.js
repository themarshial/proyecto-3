/* export let survey = {}; */

import * as DB from './db.js';

let containers = document.querySelectorAll('.contenedor');

const validateMessages = [
  '',
  'Debe escribir un nombre',
  'Debe escribir su edad',
  'Debe seleccionar un país',
  'Seleccione un sistema operativo',
  'Debe seleccionar al menos un tema',
];

const displayValidateMessage = (message, msgIndex) => {
  document.querySelectorAll('.validate-message')[msgIndex].innerHTML = message;
  setTimeout(() => {
    document.querySelectorAll('.validate-message')[msgIndex].innerHTML = '';
  }, 1500);
};

const validateFunctions = [
  function () {
    return true;
  },
  function () {
    return document.getElementById('name').value === '' ? false : true;
  },
  function () {
    return document.getElementById('age').value === '' ? false : true;
  },
  function () {
    return document.getElementById('country').value === '' ? false : true;
  },
  function () {
    return Array.from(document.querySelectorAll('.sist_op')).reduce(
      (acc, el) => {
        return acc || el.checked;
      },
      false
    )
      ? true
      : false;
  },
  function () {
    return Array.from(document.querySelectorAll('.topics')).reduce(
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
  survey.name = document.getElementById('name').value;
  survey.age = document.getElementById('age').value;
  survey.country = document.getElementById('country').value;
  document.querySelectorAll('.sist_op').forEach((radio) => {
    if (radio.checked) {
      survey.so = radio.value;
      return;
    }
  });
  document.querySelectorAll('.topics').forEach((topic) => {
    topic.checked
      ? survey.dificult_topics.push(1)
      : survey.dificult_topics.push(0);
  });
  return survey;
};
export function fillCountrySelectBox() {
  let select = document.querySelector('#country');
  DB.getCountriesData()
    .then((res) => {
      res.features.map((country) => {
        let option = document.createElement('option');
        option.innerHTML = country.properties.COUNTRY;
        option.value = country.properties.COUNTRY;
        select.appendChild(option);
      });
    })
    .catch((err) => console.log(err));
}

export const manageQuestions = () => {
  document.querySelectorAll('.next').forEach((boton, index) => {
    boton.addEventListener('click', () => {
      console.log(containers[index]);
      if (validateFunctions[index]()) {
        containers[index].classList.add('hidden');
        if (index + 1 <= containers.length)
          containers[index + 1].classList.remove('hidden');
      } else {
        displayValidateMessage(validateMessages[index], index);
      }
    });
  });
};

export const showResults = () => {
  document.querySelectorAll('.contenedor').forEach((e) => {
    e.classList.add('hidden');
  });
  document.getElementById('graphs-container').classList.remove('hidden');
};

export const showSurvey = () => {
  document.querySelectorAll('.contenedor').forEach((e) => {
    e.classList.add('hidden');
  });
  document.getElementById('main-container').classList.remove('hidden');
  clearData();
};

export const clearData = () => {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('country').selectedIndex = 0;
  document.querySelectorAll('.sist_op').forEach((radio) => {
    radio.checked = false;
  });
  document.querySelectorAll('.topics').forEach((topic) => {
    topic.checked = false;
  });
};
