// models/user.js
const knex = require('../data/knex'); // Adjust the path as needed to your Knex configuration

const createUser = async (username, password) => {
    // Example: Using bcrypt to hash passwords before storing them
    const hashedPassword = await bcrypt.hash(password, 10);
    return knex('users').insert({
        username,
        password: hashedPassword
    });
};

const findUserByUsername = (username) => {
    return knex('users').where({ username }).first();
};

module.exports = {
    createUser,
    findUserByUsername
};
