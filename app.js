require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const next = require("next")
const getRouter = require("./server/routes/getRoutes")
const postRouter = require("./server/routes/postRoutes")
const passport = require("./server/passportConfig")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(getRouter)
app.use(postRouter)

nextApp
  .prepare()
  .then(() => {
    app.all("*", (req, res) => {
      return handle(req, res)
    })

    app.listen(3000, (err) => {
      if (err) {
        console.error("Failed to start server:", err)
        process.exit(1)
      }
      console.log("> Ready on http://localhost:3000")
    })
  })
  .catch((err) => {
    console.error("Failed to prepare Next.js app:", err)
    process.exit(1)
  })
