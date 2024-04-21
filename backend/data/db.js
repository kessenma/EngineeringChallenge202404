// backend/data/db.js
const knexConfig = require('./knexfile.js').development;  // Make sure to access the development property
const knex = require('knex')(knexConfig);

module.exports = knex;
