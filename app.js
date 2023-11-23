const express = require('express');
const router = require('./routers');
const session = require('express-session')
const app = express()
const port = 5555


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})