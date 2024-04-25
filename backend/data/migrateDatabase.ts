// migrateDatabase.ts
import db from './db';

export const migrateDatabase = () => {
    return db.migrate.latest()
        .then(() => {
            console.log('Migrations are up to date');
        })
        .catch((error: any) => {
            console.error('Error running migrations:', error);
            process.exit(1);
        });
};