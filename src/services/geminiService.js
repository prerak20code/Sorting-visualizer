import axios from 'axios';
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
console.log('GEMINI_API_ENDPOINT:', GEMINI_API_ENDPOINT);
// console.log('API_KEY:', process.env.REACT_APP_GEMINI_API_KEY);
const API_KEY = '';//put your own api key here you can get it from https://generativelanguage.google.com/console/api-keys
// contens i this
export const getDryRunSummary = async (algorithm, array) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Provide a step-by-step dry run summary of the ${algorithm} algorithm for the following array: ${JSON.stringify(array)}. Please keep it concise and focus on key steps.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 3000,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching dry run summary:', error,error.response?.status, error.response?.data);
    return 'Unable to generate dry run summary at this time.';
  }
};