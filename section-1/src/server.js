const { mockHubSpotDeals } = require('./mockHubSpot');

// Mock HubSpot API
mockHubSpotDeals();

const app = require('./app');
const {backgroundProcess } = require('./function');
const {sequelize} = require('./model');

// const nock = require('nock');

// nock.recorder.rec() only comment out for debugging purposes

// Sync the database and create the table if it doesn't exist
sequelize.sync()
  .then(() => {
    console.log('Deals table created successfully!');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });

  
// Mimic a cron process 
setTimeout(() => {
  // backgroundProcess() represent a cron background process running to fetch and insert hub spot deals data into db.
  backgroundProcess();
}, 2000)

init();

async function init() {
  try {

    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });

  } catch (error) {
    console.log(error)
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
