const express = require('express');
const path = require('path');
const app = express();
const db = require('./database')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config()

const driveTestRoutes = require('./routers/driveTestRouter');
const authRouter = require('./routers/authRouter')

// port
const port = 3000;

const store = new MongoStore({
  mongoUrl: process.env.MONGODB_URI
});

// middleware
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')))

app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  req.user = req.session.user
});

// routers
app.use('/auth', authRouter)
app.use(driveTestRoutes)

// run database
db
  .then(result => {
    console.log('connected mongoose')
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(err => console.log(err));
