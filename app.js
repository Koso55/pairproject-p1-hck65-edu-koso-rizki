const express = require('express');
const router = require('./routers');
const app = express()
const port = 5555

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})