const nock = require('nock');

const mockHubSpotDeals = () => {
  nock('https://api.hubapi.com', {
    reqheaders: {
      authorization: 'Bearer eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAiMTIwNSIsICJuYW1lIjogIlRlc3QgVXNlciIsICJyb2xlIjogInN0dWRlbnQiLCAiaWF0IjogMTczMDk1OTQ4NX0.tGp34GyaemHUyQqlMx-NctHve5QgzGkqU-cqs48n7sM'
    }
  })
    .get('/crm/v3/objects/deals')
    .query({ properties: 'hs_priority', filter: 'hs_priority:high', limit: 100, archived: false })
    .reply(200, {
      results: [
        {
          properties: {
            hs_priority: 'high',
            dealname: 'High Priority Deal 1',
            amount: '1000',
            closedate: '2024-12-31',
          },
        },
        {
          properties: {
            hs_priority: 'high',
            dealname: 'High Priority Deal 2',
            amount: '2000',
            closedate: '2024-11-30',
          },
        },
      ],
    });
};

module.exports = { mockHubSpotDeals };
