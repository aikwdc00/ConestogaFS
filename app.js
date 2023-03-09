const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const port = 3000;
const User = require('./models/user')
const driveTestRoutes = require('./routers/driveTestRouter');

const MONGODB_URI =
  'mongodb+srv://test123:Conestoga@test123.hbksyts.mongodb.net/fullStackAssignment?retryWrites=true&w=majority';




// middleware
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')))

app.use(flash());

app.use(
  session({
    secret: 'canada drive test',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User
    .findOne({ LicenseNo: req.session.user.LicenseNo })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


// routers
app.use(driveTestRoutes)


mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('connected mongoose')
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log(err);
  });
