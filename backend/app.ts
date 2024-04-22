import express, { Request, Response } from 'express';
import passport from 'passport'; // Import passport
import session from 'express-session'; // Import express-session
import { Strategy as LocalStrategy } from 'passport-local';
import { getMachineHealth } from './machineHealth';
import db from './data/db';
import { User } from './types/types';

const app = express();
const port = 3001;

// Session configuration
// Make sure to set the SESSION_SECRET as an environment variable
const SESSION_SECRET = process.env.SESSION_SECRET || 'default_session_secret';

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy(
    (username, password, done) => {
      // Here you would find the user in your database
      // and compare the password
      /*
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validatePassword(password)) { // Ensure you have this method on your User modelx
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
      */
    }
));

// Serialize user into session
// passport.serializeUser((user: User, done) => {
//   done(null, (user as User).id);
// });

passport.serializeUser((user: any, done) => {
  console.log(user); // Check the user object structure
  done(null, user.id);
});


passport.deserializeUser((id: string, done) => {
  db('users').where({ id: parseInt(id, 10) }).first()
      .then((user: User | undefined) => done(null, user))
      .catch((error: any) => done(error));
});


// Middleware to parse JSON request bodies
app.use(express.json());

// Authentication routes would go here
// You'll need to implement these routes
/*
app.post('/login', passport.authenticate('local', {
  // Set your login success and failure routes
}));

app.get('/logout', (req, res) => {
  req.logout();
  // Redirect or handle the logout as needed
});
*/

app.get('/protected-route', passport.authenticate('strategy-name', { session: false }), (req, res) => {
  res.json({ message: 'If you see this, you are authenticated' });
});


// Endpoint to get machine health score
app.post('/machine-health', (req: Request, res: Response) => {
  // Ensure that the user is authenticated before allowing access to this route
  if (!req.isAuthenticated()) {
    // If not authenticated, return an appropriate response, such as a 401 Unauthorized
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
