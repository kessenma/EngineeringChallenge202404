const config = {
    client: 'sqlite3',
    connection: { filename: './data/dev.sqlite3' },
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' }
};

export default config;