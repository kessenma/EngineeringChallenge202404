import express, {NextFunction, Request, Response} from 'express';
import passport from 'passport'; // Import passport
import session from 'express-session'; // Import express-session
import { Strategy as LocalStrategy } from 'passport-local';
import { getMachineHealth } from './machineHealth';
import db from './data/db';
import bcrypt from 'bcryptjs';
import { User } from './types/types';
import { IVerifyOptions } from 'passport-local';

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

// Middleware to parse JSON request bodies
app.use(express.json());

// Passport local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await db('users').where({ username }).first();
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
));
// Login Route
// Login Route
app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: User | false, info: IVerifyOptions) => {
    if (err) {
      return res.status(500).json({ message: 'Error during authentication', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    req.logIn(user, (loginErr: Error) => {
      if (loginErr) {
        return res.status(500).json({ message: 'Error during login', error: loginErr.message });
      }
      // Upon successful login, you may want to send user details and a token
      return res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    });
  })(req, res, next);
});


// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      created_at: new Date().toISOString(), // Ensure dates are ISO strings
      updated_at: new Date().toISOString()
    };

    const [userId] = await db('users').insert(newUser).returning('id');

    res.status(201).json({ message: 'User created', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up', error });
  }
});


passport.serializeUser((user: any, done) => {
  console.log(user); // Check the user object structure
  done(null, user.id);
});


passport.deserializeUser((id: string, done) => {
  db('users').where({ id: parseInt(id, 10) }).first()
      .then((user: User | undefined) => done(null, user))
      .catch((error: any) => done(error));
});




app.get('/protected-route', passport.authenticate('local', { session: false }), (req, res) => {
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
