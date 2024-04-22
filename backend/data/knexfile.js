// backend/data/knexfile.js
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/dev.sqlite3'  // The path to the SQLite file
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations'  // The path to the migrations folder
        }
    }
};
