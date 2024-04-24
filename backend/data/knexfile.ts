import knex from 'knex';

const knexInstance = knex({
    client: 'sqlite3',
    connection: { filename: './dev.sqlite3' },
    useNullAsDefault: true,
    migrations: { directory: './migrations' }
});

export default knexInstance;
