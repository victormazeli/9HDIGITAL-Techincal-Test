

## Short Answer

I would implement a wait time or increment the wait time as the rate limit on the api has been reached, 

This would prevent multiple retries over a short period of time. The rate function will have a number of request in a specific time frame in which the request  Also I would use a Queue to process large data incoming through the API.