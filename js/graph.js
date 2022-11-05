import * as ST from './statistics.js';
import * as DB from './db.js';
export var ageChart, osChart, topicChart, map;

//grafica de barras
export const makeAgeChart = (data) => {
  let ageChart = new Chart(
    document.getElementById('chart-1').getContext('2d'),
    {
      type: 'bar',
      data: {
        labels: ST.getAgeTitles(),
        datasets: [
          {
            label: 'Edad',
            data: data,
            backgroundColor: [
              'rgb(66,134,244)',
              'rgb(74,135,72)',
              'rgb(229,89,50)',
            ],
          },
        ],
      },
      options: {
        /*scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        */
        resposive: true,
        maintainAspectRatio: false,
      },
    }
  );
  return ageChart;
};

export const makeOsChart = (data) => {
  let osChart = new Chart(document.getElementById('chart-2').getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Windows', 'MacOS', 'Linux'],
      datasets: [
        {
          label: 'Sistema Operativo',
          data: data,
          backgroundColor: [
            'rgb(66,134,244)',
            'rgb(74,135,72)',
            'rgb(229,89,50)',
          ],
        },
      ],
    },
    options: {
      resposive: true,
      maintainAspectRatio: false,
    },
  });
  return osChart;
};

export const makeTopicsChart = (dataYes, dataNo) => {
  let topicChart = new Chart(
    document.getElementById('chart-4').getContext('2d'),
    {
      type: 'bar',
      data: {
        labels: [
          'HTML',
          'CSS',
          'Javascript',
          'Arrays',
          'DOM',
          'Funciones',
          'Objetos',
          'Promesas',
        ],
        datasets: [
          {
            label: 'No se me dificulta',
            data: dataNo,
            backgroundColor: ['rgb(66,134,244)'],
          },
          {
            label: 'Se me dificulta',
            data: dataYes,
            backgroundColor: ['rgb(74,135,72)'],
          },
        ],
      },
      options: {
        resposive: true,
      },
    }
  );
  return topicChart;
};

export const buildDashBoard = () => {
  DB.getSurveys()
    .then((res) => {
      if (
        ageChart !== undefined &&
        osChart !== undefined &&
        topicChart !== undefined &&
        map !== undefined
      ) {
        ageChart.update();
        osChart.update();
        topicChart.update();
        map.setView([23.634501, -82.552784], 3);
      } else {
        ageChart = makeAgeChart(ST.groupAgeData(DB.getSurveyAgeData(res)));

        osChart = makeOsChart(
          ST.getFrequencies(DB.getSurveySOData(res), [
            'Windows',
            'MacOS',
            'Linux',
          ])
        );

        let [dTopics, nDTopics] = ST.getTopicsFrecuencies(
          DB.getSurveyTopicData(res)
        );
        topicChart = makeTopicsChart(dTopics, nDTopics);

        let singleCountries = ST.removeDuplicates(DB.getSurveyCountryData(res));
        let countryFrecuencies = ST.getFrequencies(
          DB.getSurveyCountryData(res),
          singleCountries
        );
        DB.getCountriesData()
          .then((res) => {
            let coordinatesArray = ST.getCoordinatesAndFeq(
              res,
              singleCountries,
              countryFrecuencies
            );
            console.log(res);
            map = L.map('map').setView([23.634501, -82.552784], 3);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 6,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            coordinatesArray.forEach((el) => {
              let circle = L.circle([el[0], el[1]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                stroke: false,
                radius: 80000 * el[2] * 0.6,
              }).addTo(map);

              circle.bindTooltip(`${el[2]}`);
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
