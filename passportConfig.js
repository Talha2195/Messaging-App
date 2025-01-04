const passport = require("passport")
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt")
const db = require("./db/prismaClient")
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        const token = ExtractJwt.fromUrlQueryParameter("token")(req)
        console.log("Extracted token:", token)
        if (token && token.startsWith("Bearer ")) {
          const slicedToken = token.slice(7)
          console.log("Sliced token:", slicedToken)
          return slicedToken
        }
        return token
      },
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        console.log("Payload:", payload)
        const user = await db.findUserById(payload.userId)
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

const authMiddleware = passport.authenticate("jwt", { session: false })

module.exports = { authMiddleware }
