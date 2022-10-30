const ageRanges = [
  {
    title: '< 20',
    min: 0,
    max: 20,
  },
  {
    title: '20 - 25', //(20,25]
    min: 20,
    max: 25,
  },
  {
    title: '25 - 30',
    min: 25,
    max: 30,
  },
  {
    title: '30 - 35',
    min: 30,
    max: 35,
  },
  {
    title: '35 - 40',
    min: 35,
    max: 40,
  },
  {
    title: '> 40',
    min: 40,
    max: 100,
  },
];

/* Receives all ages as parameters, groups them into categories and returns an array with the count of ages in each category. */
const processAgeData = (data) => {
  let groupedData = [];
  for (let i = 0; i < ageRanges.length; i++) {
    groupedData.push(0);
  }
  data.forEach((age) => {
    for (let i = 0; i < ageRanges.length; i++) {
      if (age > ageRanges[i].min && age <= ageRanges[i].max) {
        groupedData[i] += 1;
        return;
      }
    }
  });
  return groupedData;
};

const countOccurences = (arr, findVal) =>
  arr.reduce((acc, val) => (val === findVal ? acc + 1 : acc), 0);

const processSOData = (data, findValues) => {
  let SOData = data.map((survey) => {
    return survey['so'];
  });
  let SOFrecuencies = findValues.map((so) => {
    return countOccurences(SOData, so);
  });
  return SOFrecuencies;
};

const getSingleCountries = (countries) => [...new Set(countries)];

const getCoordinate = (countries, country) => {
  let index = countries.features.findIndex(
    (item) => item.properties.COUNTRY === country
  );
  return [
    countries.features[index].geometry.coordinates[1],
    countries.features[index].geometry.coordinates[0],
  ];
};

const getCoordinatesArray = (countries, findValues, frecuencies) => {
  return findValues.map((item, index) => {
    return getCoordinate(countries, item).concat(frecuencies[index]);
  });
};

const getFrequencies = (data, findValues) => {
  return findValues.map((item) => {
    return countOccurences(data, item);
  });
};
