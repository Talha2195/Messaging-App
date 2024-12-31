const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const db = require('./db/prismaClient');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        const token = ExtractJwt.fromUrlQueryParameter('token')(req);
        if (token && token.startsWith('Bearer ')) {
          return token.slice(7);
        }
        return token; 
      },
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db.findUserById(payload.userId);
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

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = { authMiddleware };




