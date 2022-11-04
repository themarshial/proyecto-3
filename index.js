import * as UI from "./js/ui.js";
import * as DB from "./js/db.js";
import * as CH from "./js/graph.js";
import * as ST from "./js/statistics.js";

UI.manageQuestions();
DB.getSurveys().then((res) => {
  let ages = DB.getSurveyAgeData(res);
  let groupedAges = ST.groupAgeData(ages);
  CH.makeAgeChart(groupedAges);
  let os = DB.getSurveySOData(res);
  let osFrecuencies = ST.getFrequencies(os, ["Windows", "MacOS", "Linux"]);
  CH.makeOsChart(osFrecuencies);
  let [siDificulta, noDificulta] = ST.getTopicsFrecuencies(
    DB.getSurveyTopicData(res)
  );
  CH.makeTopicsChart(siDificulta, noDificulta);
  let countries = DB.getSurveyCountryData(res);
  console.log(countries);
  let singleCountries = ST.removeDuplicates(countries);
  let countryFrecuencies = ST.getFrequencies(countries, singleCountries);

  DB.getCountriesData()
    .then((res) => {
      let cordinatesArray = ST.getCoordinatesAndFeq(
        res,
        singleCountries,
        countryFrecuencies
      );
      const map = L.map("map").setView([-13.6, -82.5], 3);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      cordinatesArray.forEach((el) => {
        console.log(el);
        let circle = L.circle([el[0], el[1]], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          stroke: false,
          radius: 200000 * el[2] * 0.3,
        }).addTo(map);

        circle.bindTooltip(`${el[2]}`);
      });
    })

    .catch((error) => console.log(error));
});

document.querySelector(".save").addEventListener("click", () => {
  DB.postSurvey(UI.buildSurveyObject())
    .then((survey) => {
      console.log(survey);
    })
    .catch((err) => console.error(err));
});

document
  .getElementById("dasboardLink")
  .addEventListener("click", UI.showResults);

  document
  .getElementById("headerDashboardLink")
  .addEventListener("click", UI.showResults);

  document
  .getElementById("encuestaLink")
  .addEventListener("click", UI.showSurvey);