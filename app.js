const express = require('express');
const path = require('path');
const app = express();
const db = require('./database')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config()

const User = require('./models/user')
const driveTestRoutes = require('./routers/driveTestRouter');
const authRouter = require('./routers/authRouter')
const examinerRouter = require('./routers/examinerRouter')

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

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: store
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById({ _id: req.session.user._id })
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => {
      console.log(err)
    })
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.userType = req?.user?.userType
  // res.locals.csrfToken = req.csrfToken();
  next();
});

// routers
app.use('/auth', authRouter)
app.use('/examiner', examinerRouter)
app.use(driveTestRoutes)

// run database
db
  .then(result => {
    console.log('connected mongoose')
    app.listen(port, (err) => {
      if (err) {
        console.log('connect err', err)
        return
      }
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(err => console.log('err', err));
