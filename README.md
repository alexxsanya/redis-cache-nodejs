
# Guide
https://itnext.io/learn-to-cache-your-nodejs-application-with-redis-in-6-minutes-745a574a9739

# Decription
- Express will help us set our server. 
- We will use the redis package to connect our app to the Redis server running locally on our machine and
- we will use axios to make requests to the Countries API (https://restcountries.eu/#api-endpoints-all) to fetch data.

## Project Dependencies
- install redis on your machine with this guide https://redis.io/topics/quickstart

- `npm i express redis axios`

## Dev Dependencies
We will also use nodemon as our dev-dependency to be able to save and run our changes to our server without having to restart it. 

Run the following command in the terminal from our project directory,

`npm i -D nodemon`

## Setup
- `npm install`

### Run
- start the redis server `redis-server`
- npm start