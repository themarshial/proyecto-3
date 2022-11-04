const AGE_RANGES = [
  {
    title: "< 20",
    min: 0,
    max: 20,
  },
  {
    title: "20 - 25", //(20,25]
    min: 20,
    max: 25,
  },
  {
    title: "25 - 30",
    min: 25,
    max: 30,
  },
  {
    title: "30 - 35",
    min: 30,
    max: 35,
  },
  {
    title: "35 - 40",
    min: 35,
    max: 40,
  },
  {
    title: "> 40",
    min: 40,
    max: 100,
  },
];

const NUM_TOPICS = 8; // Number of posible difficult topics to ask in the survey

/* Get the tittles property values of AGE_RANGES constant */
export const getAgeTitles = (ageRanges) => {
  return AGE_RANGES.map((range) => range["title"]);
};

/* Receives all ages as parameters, groups them into categories and returns an array with the count of ages in each category. */
export const groupAgeData = (data) => {
  let groupedData = new Array(AGE_RANGES.length).fill(0);
  data.forEach((age) => {
    for (let i = 0; i < AGE_RANGES.length; i++) {
      if (age > AGE_RANGES[i].min && age <= AGE_RANGES[i].max) {
        groupedData[i] += 1;
        return;
      }
    }
  });
  return groupedData;
};

/* Iterates over an array and counts the occurrences of a given value */
const countOccurences = (arr, findVal) =>
  arr.reduce((acc, val) => (val === findVal ? acc + 1 : acc), 0);

/* Remove repeated elements from a given array */
export const removeDuplicates = (data) => [...new Set(data)];

/* Search for a country by its name within a GeoJson file and return the coordinates of the centroid of the searched country */
const getCoordinate = (countries, country) => {
  let index = countries.features.findIndex(
    (item) => item.properties.COUNTRY === country
  );
  return [
    countries.features[index].geometry.coordinates[1],
    countries.features[index].geometry.coordinates[0],
  ];
};

/* Returns an array formed by coordinates and frequencies of countries stored in the array provided to the function */
export const getCoordinatesAndFeq = (countries, findValues, frecuencies) => {
  return findValues.map((item, index) => {
    return getCoordinate(countries, item).concat(frecuencies[index]);
  });
};

/* Returns the cumulative frequencies of elements of a given array */
export const getFrequencies = (data, findValues) => {
  return findValues.map((item) => {
    return countOccurences(data, item);
  });
};

/* Returns the cumulative frequencies of elements of the difficult topics by dividing them into two arrays: difficult and not difficult. */
export const getTopicsFrecuencies = (data) => {
  let dTopics = new Array(NUM_TOPICS).fill(0);
  let nDTopics = new Array(NUM_TOPICS).fill(0);
  data.forEach((element) => {
    for (let i = 0; i < NUM_TOPICS; i++) {
      element[i] === 1 ? (dTopics[i] += 1) : (nDTopics[i] += 1);
    }
  });
  return [dTopics, nDTopics];
};
