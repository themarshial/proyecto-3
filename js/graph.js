import * as ST from "./statistics.js";

//grafica de barras
export const makeAgeChart = (data) => {
  let ageChart = new Chart(
    document.getElementById("chart-1").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: ST.getAgeTitles(),
        datasets: [
          {
            label: "Edad",
            data: data,
            backgroundColor: [
              "rgb(66,134,244)",
              "rgb(74,135,72)",
              "rgb(229,89,50)",
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
      },
    }
  );
  return ageChart;
};

export const makeOsChart = (data) => {
  let osChart = new Chart(document.getElementById("chart-2").getContext("2d"), {
    type: "pie",
    data: {
      labels: ["Windows", "MacOS", "Linux"],
      datasets: [
        {
          label: "Sistema Operativo",
          data: data,
          backgroundColor: [
            "rgb(66,134,244)",
            "rgb(74,135,72)",
            "rgb(229,89,50)",
          ],
        },
      ],
    },
    options: {
      resposive: true,
    },
  });
  return osChart;
};

export const makeTopicsChart = (dataYes,dataNo) => {
  let topicChart = new Chart(document.getElementById("chart-4").getContext("2d"), {
    type: "bar",
    data: {
      labels: [
        "HTML",
        "CSS",
        "Javascript",
        "Arrays",
        "DOM",
        "Funciones",
        "Objetos",
        "Promesas",
      ],
      datasets: [
        {
          label: "No se me dificulta",
          data: dataNo,
          backgroundColor: ["rgb(66,134,244)"],
        },
        {
          label: "Se me dificulta",
          data: dataYes,
          backgroundColor: ["rgb(74,135,72)"],
        },
      ],
    },
    options: {
      resposive: true,
    },
  });
  return topicChart;
};
