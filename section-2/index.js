//  You’re given a code snippet that retrieves data from an API but has issues with error
// handling and data validation.
const axios = require('axios');
async function fetchData() {
const response = await axios.get('https://api.example.com/data');
 return response.data;
 }

fetchData().then(data => {
console.log(data.key);
}).catch(error => {
     console.error(error);
    });
    // Identify and correct at least two key errors:
    // Missing error handling for failed requests.
    // Basic validation for empty or malformed data.

// Deliverable:
// Updated code with explanations for the fixes (comments or short note).



// Solution

/**
 * The Solution Here is to wrap the axios call in a try/catch
 * The reason is to properly handle errors properly
 * If not handles correctly, the code block will run but will hang the code execution
 */
const axios = require('axios');
async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data');

        // Handle response status
        if (response.status !== 200) {
            throw new Error(`Failed to fetch hubspot deals: HTTP status ${response.status}`);
        }

         // Check if the response data is valid and contains the expected structure
        if (!response.data || !response.data.key) {
            throw new Error('Invalid data structure: Missing key.');
        }
        return response.data;
    } catch (err) {
        throw err
    }

 }

fetchData().then(data => {
console.log(data.key);
}).catch(error => {
     console.error(error);
    });