// backend/types/types.ts

// This is your custom User interface that matches the structure of your user records in the database.
export interface User {
    id: number;
    username: string;
    password: string;
    // ... other user properties
}
