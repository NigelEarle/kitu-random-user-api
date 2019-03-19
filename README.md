# Random User API

## Description

Create an API using Node.js and Express.js to expose 3 endpoints: 
  - `GET /users`: Make 10 asynchronus request to API enpoint [randomuser](https://randomuser.me/api), then list all users from memory. 10 new requests are stored in memory anytime request is made. 
  - `GET /users/firstname/:firstname`: Retrieve user by firstname property.
  - `POST /users`: Create new user data and send to memory.
  
## Getting Started

#### Clone this repo

```bash
$ git git@github.com:jhoun/kitu-random-user-api.git
$ cd kitu-random-user-api
```

#### Install dependencies

```bash
$ npm install
``````

#### Launch dev environment

```bash
$ npm start
``````

#### Launch test

```bash
$ npm test
``````

#### Directory Responsibilities

  ##### `/db`
  Database that will be used store all user data

  ##### `/routes`
  Holds all GET and POST endpoints

  ##### `test`
  Unit testing for all API routes

  ##### `util`
  Function that creates number of GET requests and validations

