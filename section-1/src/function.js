const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const { sequelize, Deal} = require("./model");

const MAX_RETRIES = 2; // Maximum number of retries
const RETRY_DELAY = 1000; // Delay between retries in milliseconds


/**
 * 
 * The Goal of using axios-retry to retry request when they fail.
 * This approach is cleaner and more easy to replicate in multiple places where needed
 * 
 */
// Set up Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://api.hubapi.com',
    headers: {
        'authorization': 'Bearer eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAiMTIwNSIsICJuYW1lIjogIlRlc3QgVXNlciIsICJyb2xlIjogInN0dWRlbnQiLCAiaWF0IjogMTczMDk1OTQ4NX0.tGp34GyaemHUyQqlMx-NctHve5QgzGkqU-cqs48n7sM', // Set your authorization header here
    },
});

// Configure axios-retry
axiosRetry(axiosInstance, {
    retries: MAX_RETRIES, 
    retryDelay: (retryCount) => {
        return retryCount * RETRY_DELAY; // Exponential backoff for retry delays
    },
    retryCondition: (error) => {
        // Retry only on network errors or 5xx responses
        return axiosRetry.isNetworkError(error) || 
               (error.response && error.response.status >= 500);
    },
});

/**
 * 
 * Function to fetch high-priority deals from HubSpot
 * NOTE: This API call assumes Authentication via token derived from the  PRIVATE APP AUTH METHOD
 */
const fetchHighPriorityDeals = async (limit = 100) => {
    try {
      const response = await axiosInstance.get('/crm/v3/objects/deals', {
        params: { 
            properties: 'hs_priority', 
            filter: 'hs_priority:high', 
            limit: limit,
            archived: false
        },
      });

      // Handle response status
      if (response.status !== 200) {
        throw new Error(`Failed to fetch hubspot deals: HTTP status ${response.status}`);
      }

    // Check if data is not Malformed
    if (!response.data || !Array.isArray(response.data.results) || !response.data.results) {
      throw new Error('Unexpected response format: invalid data structure');
    }

      return response.data.results;
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error; // Propagate the error if needed

    }
  };
  

// Function to log deals to the database using batch insert
const logDealsToDatabase = async (deals) => {
    try {
        const dealData = deals.map(deal => ({
            id: deal.id,
            hs_priority: deal.properties.hs_priority,
            dealname: deal.properties.dealname,
            amount: deal.properties.amount,
            closedate: deal.properties.closedate,
          }));
        // Perform batch insert
        await Deal.bulkCreate(dealData);
    } catch (error) {
        console.error('Error inserting data deals:', error);
       throw error
    }
  };

  const backgroundProcess = async() => {
    try {
      const deals = await fetchHighPriorityDeals(100); // Fetch up to 100 high-priority deals
      console.log(deals)
      await logDealsToDatabase(deals); // Log deals to the database
    } catch (error) {
      console.error(`An error occurred: ${JSON.stringify(error)}`);
    }
  }
  
  module.exports = {
    backgroundProcess
  }