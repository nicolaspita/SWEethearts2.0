const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.elephantURI; // comes from .env file

const pool = new Pool({
<<<<<<< HEAD
	connectionString: PG_URI, // connecting database
=======
  connectionString: PG_URI
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
