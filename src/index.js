const { search_by_zip, search_by_coordinates, search_by_name } = require("./helper");

// lambda-like handler function
module.exports.handler = async event => {

     // check the query params for zip 
        if (event.queryParams.zip) {
          const filtered = search_by_zip(event.queryParams.zip);
          return filtered;
      }

     // check the query params for name
      if (event.queryParams.name) {
          const filtered = search_by_name(event.queryParams.name);
          return filtered;
      }
  
      // check the query params for coordinates
      if (event.queryParams.lat && event.queryParams.long) {
          const filtered = search_by_coordinates(event.queryParams.lat, event.queryParams.long);
          return filtered;
      }

      throw new Error('Please provide either "zip", "name" or "long/lat" for searching.');
};
