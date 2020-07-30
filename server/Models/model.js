const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.elephantURI; // comes from .env file

const pool = new Pool({
<<<<<<< HEAD
	connectionString: PG_URI, // connecting database
=======
  connectionString: PG_URI
>>>>>>> 9249ce307f65c34a65adce601d121d6ab56ba654
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
