# Node.js API queuing service

There are 3 different APIs the service has to interface with:

 1. Shipments API [GET]
Accepts a query with 9-digit order numbers and returns a set of products (envelope, box or pallet) equivalent to the last digit.
 2. Track API [GET]
Accepts a query with 9-digit consignment number and returns one of the following tracking statuses: NEW, IN TRANSIT, COLLECTING, COLLECTED, DELIVERING, DELIVERED.
 3. Pricing API [GET]
Accepts a query with ISO-2 country code and returns a randomized floating number between 1 and 100.

There are 2 services:

 1. Query service [POST]:
    - Exposes a method that accepts a collection of API requests {'API': 'query'}.
    - Makes calls to corresponding APIs.
    - Returns a complete set of responses upon receiving all API responses.
 2. Queue query service [POST]:
    - Exposes a method that accepts a collection of API requests {'API': 'query'}.
    - API calls should be throttled and bulked into 1 request per respective API.
    - Makes a queue of calls with threshold of maximum 5 concurrent requests per API endpoint.
    - Returns a complete set of responses upon receiving all corresponding API responses.

Author: Roman Malieiev <aromaleev@gmail.com>

Project consists of two builds:
 - production optimised
 - development with source change watchers

Tech stack:
 - Node.js
 - Babel for ES6 support with ESLint
 - Nodemon development build
 - Frisby tests

## Installation

1. Install Node.js/npm
2. Navigate to the current folder
3. Run:

	 `npm install`

## Running

Build for production:

	npm run prod

Run in development mode:

	npm run dev

Following urls would be available:

 - http://localhost:8080/shipments [GET] - Shipments API
 - http://localhost:8080/track [GET] - Track API
 - http://localhost:8080/pricing [GET] - Pricing API
 - http://localhost:8080/service [POST] - Query service
 - http://localhost:8080/service-queue [POST] - Queue query service

**NOTE**: see tests for requests examples.

Test:

	npm run prod
	npm test

## Questions

#### With the above solution, can you imagine a scenario where unnecessary calls to either one of the APIs will happen? If so, how could you solve this?

We can implement caching within some time
