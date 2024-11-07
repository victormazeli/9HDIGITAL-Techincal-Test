# SECTION ONE

The content of the code here shows how I will approach fetching data from hubspot and inserting the data into the database. (I choose the fetching the deals data in background approach and inserting into the database)

There are Still Further ways to Improve the integration, although depending on the direction of the integration.

e.g If fetching large data, continuously we can have a cron that runs and fetch data and insert into the database easily (My recommended Approach). 

I have no hubspot account with any active deal so i decided to mock hubspot deal API using the `nock` library 

reference: `[nock Library](https://www.npmjs.com/package/nock#how-does-it-work)`

# SETUP

use `npm install ` to install dependencies 

node version  `>= 18.0.0`

run with `npm start`