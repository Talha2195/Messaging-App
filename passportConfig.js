const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db/prismaClient'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {

        const user = await db.findUserById(payload.userId)

        if (!user) {
          return done(null, false); 
        }

        return done(null, user); 
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
