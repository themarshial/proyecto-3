import * as UI from './js/ui.js';
import * as DB from './js/db.js';
import * as CH from './js/graph.js';

UI.manageQuestions();

document.querySelector('.save').addEventListener('click', () => {
  DB.postSurvey(UI.buildSurveyObject())
    .then((survey) => {
      console.log(survey);
      location.reload();
    })
    .catch((err) => console.error(err));
});

document.getElementById('dasboardLink').addEventListener('click', () => {
  UI.showResults();
  CH.buildDashBoard();
});

document.getElementById('headerDashboardLink').addEventListener('click', () => {
  UI.showResults();
  CH.buildDashBoard();
});

document
  .getElementById('encuestaLink')
  .addEventListener('click', UI.showSurvey);
