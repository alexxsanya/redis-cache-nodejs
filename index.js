//set up dependencies
const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");

//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware Function to Check Cache
checkCache = (req, res, next) => {
    const { name } = req.params;
  
    redis_client.get(name, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
        res.send(data);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  };

//  Endpoint:  GET /country/:name
//  @desc Return country details for particular country name
// We have added a middleware checkCache so that requests before being made are first checked from the cache
app.get("/country/:name", checkCache, async (req, res) => {
  try {
    const { name } = req.params;
    const countryInfo = await axios.get(
      `https://restcountries.eu/rest/v2/name/${name}`
    );
    const countryData = countryInfo.data;

    //add data to Redis
    redis_client.setex(name, 3600, JSON.stringify(countryData));

    return res.json(countryData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(port, () => console.log(`Server running on Port ${port}`));