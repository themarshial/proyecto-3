let containers = document.querySelectorAll(".contenedor");

const validateMessages = ['', 'Debe escribir un nombre', 'Debe escribir su edad', 'Debe seleccionar un país', 'Seleccione un sistema operativo', 'Debe seleccionar al menos un tema'];

const displayValidateMessage = (message, msgIndex) => {
  document.querySelectorAll('.validate-message')[msgIndex].innerHTML = message;
  setTimeout(() => {
    document.querySelectorAll('.validate-message')[msgIndex].innerHTML = '';
  }, 1500);
}

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
    return Array.from(document.querySelectorAll('.sist_op')).reduce((acc, el) => {
      return acc || el.checked;
    }, false) ? true : false;
  },
  function () {
    return Array.from(document.querySelectorAll('.topics')).reduce((acc, el) => {
      return acc || el.checked;
    }, false) ? true : false;
  },

]

export const manageQuestions = () => {
  document.querySelectorAll(".next").forEach((boton, index) => {
    boton.addEventListener("click", () => {
      if (validateFunctions[index]()) {
        containers[index].classList.add("hidden");
        if (index + 1 <= containers.length) containers[index + 1].classList.remove("hidden");
      } else {
        displayValidateMessage(validateMessages[index], index)
      }
    });
  });
}

document.querySelector('.save').addEventListener('click', () => {
  buildSurveyObject();
});