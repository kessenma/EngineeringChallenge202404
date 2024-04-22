const environment = process.env.NODE_ENV || 'development';
const config = require('./data/knexfile')[environment];
const knex = require('knex')(config);

module.exports = knex;