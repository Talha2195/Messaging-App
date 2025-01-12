require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const path = require("path")
const getRouter = require("./routes/getRoutes")
const postRouter = require("./routes/postRoutes")
const passport = require("../passportConfig")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

app.use(
  cors({
    origin: "http://localhost:5000", //
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(getRouter)
app.use(postRouter)

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res)
  })

  app.listen(5000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:5000")
  })
})
