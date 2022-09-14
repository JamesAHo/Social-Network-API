const express = require('express');
const db = require('./config/connection')
const routes = require('./routes')
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// use routes
app.use(routes)

// set up mongoose




db.once('open', () => {
  app.listen(port, () => console.log(`Connected to localhost at  port ${port}!!`));
} )