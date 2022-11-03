import * as UI from './js/ui.js'
import * as DB from './js/db.js';


UI.manageQuestions();

document.querySelector('.save').addEventListener('click', () => {
    DB.postSurvey(UI.buildSurveyObject()).then((survey)=>{
        console.log(survey);
    }).catch(err=>console.error(err));
  });