import 'express-session';
import { User } from './types'


declare module 'express-session' {
    interface SessionData {
        passport: { user: User };
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        isAuthenticated(): boolean;
        user?: User;
    }
}
