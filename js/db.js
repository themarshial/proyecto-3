const ApiURL = 'http://localhost:3000/surveys';
const countriesURL =
  'https://cdn.jsdelivr.net/gh/gavinr/world-countries-centroids@v1/dist/countries.geojson';

/*  Get the db.json data via Json Server API */
export async function getSurveys() {
  const response = await fetch(ApiURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const surveys = await response.json();
  return surveys;
}

/*  Get geographic data from a GeoJson file */
export async function getCountriesData() {
  const response = await fetch(countriesURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const countries = await response.json();
  return countries;
}

/* Write a new survey in db.json file via Json Server API */
export async function postSurvey(survey) {
  const options = {
    method: 'POST',
    body: JSON.stringify(survey),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  let surveyResponse = null;
  try {
    const response = await fetch(ApiURL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    surveyResponse = await response.json();
  } catch (error) {
    console.error(error);
  }
  return surveyResponse;
}

/* In following functions: extract an array of values from an array of objects  */
export const getSurveyAgeData = (surveys) => {
  return surveys.map((survey) => survey['age']);
};

export const getSurveyCountryData = (surveys) => {
  return surveys.map((survey) => survey['country']);
};

export const getSurveySOData = (surveys) => {
  return surveys.map((survey) => survey['so']);
};

export const getSurveyTopicData = (surveys) => {
  return surveys.map((survey) => survey['dificult_topics']);
};
