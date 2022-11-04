import * as UI from "./js/ui.js";
import * as DB from "./js/db.js";
import * as CH from "./js/graph.js";
import * as ST from "./js/statistics.js";

UI.manageQuestions();
DB.getSurveys().then((res) => {
  let ages = DB.getSurveyAgeData(res);
  let groupedAges = ST.groupAgeData(ages);
  CH.makeAgeChart(groupedAges);
  let os = DB.getSurveySOData(res)
  let osFrecuencies = ST.getFrequencies(os,["Windows", "MacOS", "Linux"])
  CH.makeOsChart(osFrecuencies)
});

document.querySelector(".save").addEventListener("click", () => {
  DB.postSurvey(UI.buildSurveyObject())
    .then((survey) => {
      console.log(survey);
    })
    .catch((err) => console.error(err));
});
