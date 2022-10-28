const ApiURL = 'http://localhost:3000/surveys';

async function getSurveys() {
  const response = await fetch(ApiURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const surveys = await response.json();
  return surveys;
}
async function getCountriesData() {
  let surveys = [];
  try {
    const response = await fetch(ApiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    surveys = await response.json();
  } catch (error) {
    console.error(error);
  }
  return surveys;
}

async function postSurvey(survey) {
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
