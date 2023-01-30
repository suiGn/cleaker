//      _ ___   _  _  __
//  |V||_  ||_|/ \| \(_
//  | ||__ || |\_/|_/__)
//
// route middleware to make sure

const { sessionStore } = require("../index");
var session = require("express-session");
require('../configs/config');
const { NONE } = require("sequelize");

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    if (req.user[0].verified === 0) {
      //console.log(req.user[0]);
      res.render("pages/sec/verify-email", { usr: req.user[0] });
      return;
    } else {
      //console.log(req.user[0].verified);
      return next();
    }
  }
  // if they aren't redirect them to the home page
  res.redirect("/");
}

function formatLocalDate() {
  var now = new Date(),
    tzo = -now.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    now.getFullYear() +
    "-" +
    pad(now.getMonth() + 1) +
    "-" +
    pad(now.getDate()) +
    "T" +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes()) +
    ":" +
    pad(now.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
}

function onAuthorizeSuccess(data, accept) {
  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  console.log("[Socket.io] - User not Authenticated ", message);
  // We use this callback to log all of our failed connections.
  accept(null, true);
}

var sessionMiddleware = session({
  cookie: {
    httpOnly: true , maxAge: 24 * 60 * 60 * 1000 },
  name: sessionName,
  store: sessionStore,
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
});

module.exports = {
  onAuthorizeFail,
  onAuthorizeSuccess,
  isLoggedIn,
  formatLocalDate,
  sessionMiddleware,
  formatLocalDate
};
