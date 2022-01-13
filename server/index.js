/************************************
APP: Cleaker                        *
Cleaker  							*                                                                                                                                                                                                                                                                                                 
Sui Gn		                		*
Copyrights Neurons Art & Technology *
*************************************/
const express = require("express");
const cookieSession = require("cookie-session");
const path = require("path");
const PORT = process.env.PORT || 5000;
//const FRONT_END = process.env.URL_FRONT || "https://www.orgboat.me";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const bodyParser = require("body-parser");
const fs = require("fs");
const routes = require("./routes");
const method = require("./middlewares/methods");
const mailer = require("./middlewares/mailer");
const multer = require("multer");
var unicorn = "🍺🦄🍺";
var uuid = require("node-uuid");
var nodemailer = require("nodemailer");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var cors = require("cors");
const aws = require("aws-sdk");

const buildPath = path.join(__dirname, "..", "build");
//middlewares
const {
  isLoggedIn,
  sessionMiddleware,
  onAuthorizeFail,
  onAuthorizeSuccess,
} = require("./middlewares/authentication");
const { logger } = require("./middlewares/winston/logs/log");

//const cookieSession = require('cookie-session');
var flash = require("connect-flash");
require("./configs/passport")(passport); //pass passport for configuration
var Sequelize = require("sequelize");
var session = require("express-session");
require("./configs/config");

//AWS
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = "us-east-2";

//Mysql
var mysql = require("mysql");
var MySQLStore = require("express-mysql-session")(session);
let options = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  charset : 'utf8mb4'
};
var connection = mysql.createConnection(options); // or mysql.createPool(options);
var orgboatDB = connection;
exports.orgboatDB = connection;
var sessionStore = new MySQLStore({} /* session store options */, connection);
exports.sessionStore = sessionStore;

const server = express()
  .use(cors())
  .use(express.static(path.join(__dirname, "public")))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .use(flash()) // use connect-flash for flash messages stored in session
  .use(express.static(buildPath))
  //.set("views", path.join(__dirname, "views"))
  // passport.authenticate middleware is used here to authenticate the request
  //.set("view engine", "ejs")
  // The middleware receives the data from Google and runs the function on Strategy config
  // process the login form
  .get("/logged", routes.home)
  .get("/logout", (req, res) => {
    logger.info("LogOut");
    req.logout();
    res.json({
      ok: true,
    });
    // res.redirect("/");
  })
  .get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"], // Used to specify the required data
    })
  )
  .get(
    "/auth/google/callback",
    passport.authenticate("google"),
    routes.authGoogle
  )
  .get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['email'] }))

  .get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    routes.authFacebook
  )
  .get("/sign-s3", (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query["file-name"];
    const fileType = req.query["file-type"];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    };

    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  })
  //.get('/stream',(req,res)=>{res.redirect('index.html')})
  //.get('/visualizar',(req,res)=>{res.redirect('visualizar.html')})
  .get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  })
  .post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (user && user.verified === 0) {
        let em = user.email;
        let uuid = user.u_id;
        return res.redirect("/notverify-email?em=" + em + "&uuid=" + uuid);
      } else if (err || !user) {
        return res.redirect("/badLogin");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/workspace");
      });
    })(req, res, next);
  })
  .get("/subscribe", routes.subscribe)
  .post("/verMail", routes.verMail)
  .post("/publicUser", routes.publicUser)
  .post("/resnd", routes.rsnvMail)
  .post("/subscribing", routes.subscribing)
  .get("/reset-pwd", routes.resetPass) // Reset Password request
  .post("/rstpwd", mailer.rpwdm) //Send Reset Pwd Password
  .get("/pwdRst", routes.pwdRst) //Change Password
  .post("/resetPwd", routes.changePass) // Post Change Password
  //Passport
  .get("/lock-screen", routes.lockScreen)
  .post("/edProf", isLoggedIn, routes.editProfile)
  //video call
  .post("/startvideocall",isLoggedIn,routes.call)
  .post("/uploadpPhoto", (req, res) => {
    //Multer
    const storage = multer.diskStorage({
      destination: "../build/uploads/",
      filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
      },
    });
    const upload = multer({ storage: storage }).single("myImage");
    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file); //Here you get file.
      if (err) {
        //console.log(err);
        res.redirect("/workspace");
      }
      //console.log(req.file.path);
      routes.savedbimage(req, res).then((url) => {
        res.json({ ok: url });
      });
    });
  })
  .post("/uploadpPhotoGroup", (req, res) => {
    //Multer
    const storage = multer.diskStorage({
      destination: "../build/uploads/",
      filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
      },
    });
    const upload = multer({ storage: storage }).single("myImage");
    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file); //Here you get file.
      if (err) {
        res.redirect("/workspace");
      }
      routes.savedbimageGroup(req, res).then((url) => {
        res.json({ ok: url });
      });
    });
  })
  .get("/pphoto", (req, res) => {
    //console.log(req);
    //res.json()
    //let p = path.join(__dirname, req.user[0].pphoto);
    //console.log(p);
    res.sendFile(path.join(__dirname, req.user[0].pphoto));
  })
  .get("/pphotoChat/:name", (req, res) => {
    (async () => {
      console.log(req.params.name);
      const result = await routes.pphotourl(req.params.name);
      res.sendFile(path.join(__dirname, result));
    })();
  })
  .post("/uploadpChatFile", (req, res) => {
    const storage = multer.diskStorage({
      destination: "../build/uploads/",
      filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
      },
    });
    const upload = multer({ storage: storage }).single("myFile");
    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file); //Here you get file.
      if (err) {
        res.redirect("/workspace");
      }
      routes.saveFileChat(req, res).then((url) => {
        res.json({ url: url });
      });
    });
  });
/** 	   o       o                                
           |       |                               
           o   o   o  
            \ / \ / 
             o   o  ebsocket IO
      __ _    __ 
     (_ / \	|_ 
     __)\_/	|__
  **/

var http = require("http").Server(server);
var io = require("socket.io")(http);
var passportSocketIo = require("passport.socketio");
const { json } = require("sequelize");
require("./configs/config");
//Move Socket in file socket.js

//With Socket.io >= 1.0
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser, // the same middleware you registrer in express
    key: sessionName, // the name of the cookie where express/connect stores its session_id
    secret: secretKey, // the session_secret to parse the cookie
    store: sessionStore, // we NEED to use a sessionstore. no memorystore please
    success: onAuthorizeSuccess, // *optional* callback on success - read more below
    fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
  })
);

io.use(function (socket, next) {
  // Wrap the express middleware
  sessionMiddleware(socket.request, {}, next);
});
module.exports.io = io;
require("./sockets/socket");

// launch ======================================================================
http.listen(PORT, function () {
  console.log(
    ` 
Cleaking 
			 on port: ${PORT}`
  );
});
