/*
______ _____ _   _ _____ _____ _____ 
| ___ \  _  | | | |_   _|  ___/  ___|
| |_/ / | | | | | | | | | |__ \ `--. 
|    /| | | | | | | | | |  __| `--. \
| |\ \\ \_/ / |_| | | | | |___/\__/ /
\_| \_|\___/ \___/  \_/ \____/\____/ 
              Cleaker
SUI GENERIS 
where do we go from here?
*/

const index = require("./index");
const uuid = require("node-uuid");
const jwt = require("jsonwebtoken");
require("./configs/config");
const method = require("./middlewares/methods");
const bcrypt = require("bcrypt");
const mailer = require("./middlewares/mailer");
const multer = require("multer");
const Dropbox = require("dropbox").Dropbox;
const { readFileSync, readStream } = require("./middlewares/file");
const { CustomValidation } = require("express-validator/src/context-items");
var AWS = require("aws-sdk");


AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY
});

exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    console.log("home");
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
};

exports.subscribe = function (req, res) {
  res.redirect("/");
  //res.render("pages/subscribe", { opt: " ", opt1: "Log In", opt2: "/" });
};
exports.authFacebook = (req,res)=>{
  //console.log(req);
  var name = req.user.displayName;
  var usrname = req.user.emails[0].value;
  var email = usrname;
  var profile_pic = req.user.photos[0].value;
  var u_type = 1;
  var dt = new Date();
  var uuid_numbr = uuid.v4();
  index.orgboatDB.query(
    `SELECT * FROM usrs WHERE usrname = '${usrname}'  OR email = '${usrname}'`,
    (err, resp) => {
      if (err) {
        res.render("pages/index", {
          opt1: "Sign Up",
          opt2: "/subscribe",
          opt3: " ",
        });
      } else {
        if (resp.length == 0) {
          //STORES DATA
          index.orgboatDB.query(
            "INSERT INTO usrs (name, usrname, email, Verified, last_update, u_id, created, u_type, pphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)",
            [name, uuid_numbr, email, 1, dt, uuid_numbr, dt, u_type, profile_pic],
            (error, results) => {
              if (error) {
                res.redirect("/");
                throw error;
              }
              console.log("New user saved!");
            }
          );
        }
        res.redirect("https://www.cleaker.me");
      }
    }
  );
};

exports.authGoogle = (req, res) => {
  console.log(req);
  var name = req.user.displayName;
  var usrname = req.user.emails[0].value;
  var email = usrname;
  var profile_pic = req.user.photos[0].value;
  var u_type = 1;
  var dt = new Date();
  var uuid_numbr = uuid.v4();
  index.orgboatDB.query(
    `SELECT * FROM usrs WHERE usrname = '${usrname}'  OR email = '${usrname}'`,
    (err, resp) => {
      if (err) {
        res.render("pages/index", {
          opt1: "Sign Up",
          opt2: "/subscribe",
          opt3: " ",
        });
      } else {
        if (resp.length == 0) {
          //STORES DATA
          index.orgboatDB.query(
            "INSERT INTO usrs (name, usrname, email, Verified, last_update, u_id, created, u_type, pphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)",
            [name, uuid_numbr, email, 1, dt, uuid_numbr, dt, u_type, profile_pic],
            (error, results) => {
              if (error) {
                res.redirect("/");
                throw error;
              }
              console.log("New user saved!");
            }
          );
        }
        res.redirect("https://www.cleaker.me");
      }
    }
  );
};

exports.resetPass = function (req, res) {
  res.redirect("/");
};
exports.pwdRst = function (req, res) {
  var uuid = req.query.uuid;
  var email = req.query.em;
  index.orgboatDB.query(
    "SELECT * FROM usrs WHERE email = ?",
    [email],
    (err, resp) => {
      if (resp.length >= 1) {
        var usr = resp[0];
        if (usr.random === uuid) {
          res.render("pages/sec/newPass", { opt: email, opt1: uuid });
        } else {
          res.render("pages/sec/response", {
            opt2: "Error",
            opt1: "Link Expired.",
          });
        }
      } else {
        res.render("pages/sec/response", {
          opt2: "Error",
          opt1: "Not valid. Try again.",
        });
      }
    }
  );
};

exports.publicUser = function(req,res){
  var usrname = req.body.usrname;
  index.orgboatDB.query(
    "SELECT * FROM usrs WHERE usrname = ?",
    [usrname],(error, resp)=>{
      if (error) {
        console.log(error)
        res.json({
          opt1: "Error",
          opt2: "Something weird happened. Please try again.",
        });
      } else {
        console.log(res)
        res.json({
          opt1: resp[0].name,
          opt2: resp[0].pphoto,
        });
      }
    })
}

exports.verMail = function (req, res) {
  var uuid = req.body.uuid;
  var email = req.body.em;
  var verified = 1;
  index.orgboatDB.query(
    "SELECT * FROM usrs WHERE email = ?",
    [email],
    (err, resp) => {
      if (resp.length >= 1) {
        var usr = resp[0];
        if (usr.u_id === uuid) {
          index.orgboatDB.query(
            "INSERT INTO usr_domain ( domain_name, u_id_usr) VALUES (?, ?)",
            [usr.usrname+".cleaker.me", uuid],(error,result)=>{
              if (error) {
                console.log(error)
              }
          })
          index.orgboatDB.query(
            "UPDATE usrs SET verified = ? WHERE email = ?",
            [verified, email],
            (error, results) => {
              if (error) {
                res.json({
                  opt1: "Error",
                  opt2: "Something weird happened. Please try again.",
                });
              } else {
                res.json({
                  opt1: "Email verified Successfully",
                  opt2: "You can now login to your account.",
                });
              }
            }
          );
        } else {
          res.json({
            opt1: "Error",
            opt2: "Something weird happened. Please try again.",
          });
        }
      }
    }
  );
};

exports.rsnvMail = function (req, res) {
  console.log("entro?");
  var uuid = req.query.uuid;
  var email = req.query.em;
  console.log(req.query);
  mailer.verifyEmail(req, res, email, uuid);
  //console.log(req.user[0]);
};

exports.changePass = function (req, res) {
  var random = req.body.uuid;
  var email = req.body.email;
  var password = req.body.password;
  var rtpass = req.body.rtpass;
  var reset = "0";
  var saltRounds = 10;
  console.log(req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw err;
        } else {
          var Pwd = hash;
          if (password == rtpass) {
            console.log(Pwd);
            index.orgboatDB.query(
              "UPDATE usrs SET password = ?, random = ? WHERE email = ? AND random = ?",
              [Pwd, random, email, random],
              (error, results) => {
                console.log(results);
                if (error) {
                  res.json({
                    err: "Something weird happened. Please try again.",
                  });
                  // res.render("pages/sec/response", {
                  //   opt2: "Error",
                  //   opt1: "Something weird happened. Please try again.",
                  // });
                } else {
                  res.json({
                    ok: "Password Changed.",
                  });
                  // res.render("pages/sec/response", {
                  //   opt2: "Password Changed",
                  //   opt1: "Please login with your new password.",
                  // });
                }
              }
            );
          } else {
            res.render("pages/sec/response", {
              opt2: "Error",
              opt1: "Password does not match.",
            });
          }
        }
      });
    }
  });
};

exports.lockScreen = function (req, res) {
  res.render("pages/sec/lock-screen");
};
//exports.workspace = function(req, res){res.render('pages/workspace')};
//subscribe
exports.subscribing = function (req, res) {
  var clName = req.body.subName;
  var usrname = req.body.subUsername;
  var email = req.body.subEmail;
  var pwd = req.body.subPwd;
  const saltRounds = 10;
  var hashPwd = "";
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(pwd, salt, function (err, hash) {
        if (err) {
          throw err;
        } else {
          hashPwd = hash;
          var rtPwd = req.body.subRtPwd;
          var uuid_numbr = uuid.v4();
          var verified = 0;
          var dt = new Date();
          var u_type = 0;
          if (
            method.nameRegex(clName) &&
            method.usrnmRegex(usrname) &&
            method.emailRegex(email)
          ) {
            if (
              clName.length <= 3 ||
              usrname.length <= 3 ||
              email.length <= 3 ||
              pwd.length <= 4
            ) {
              // res.render("pages/subscribe", {
              //   opt: "Too short.",
              //   opt1: "Log In",
              //   opt2: "/",
              // });
              res.json({
                ok: false,
              });
              return;
            } else if (pwd != rtPwd) {
              // res.render("pages/subscribe", {
              //   opt: "Password does not match.",
              //   opt1: "Log In",
              //   opt2: "/",
              // });
              res.json({
                ok: false,
              });
              return;
            } else {
              //Verifies if the user already exists
              index.orgboatDB.query(
                "SELECT usrname FROM usrs WHERE usrname = ?",
                [usrname],
                (err, resp) => {
                  if (resp.length >= 1) {
                    res.json({
                      err: "El nombre de usuario ya existe",
                    });
                    return;
                  } else {
                    console.log(resp);
                    index.orgboatDB.query(
                      "SELECT email FROM usrs WHERE email = ?",
                      [email],
                      (err, resp) => {
                        console.log(resp);
                        if (err) {
                          console.log("Errore login: " + err);
                        }
                        if (resp.length >= 1) {
                          console.log("Email exists");
                          // res.render("pages/subscribe", {
                          //   opt: "Email Already Exists.",
                          //   opt1: "Log In",
                          //   opt2: "/",
                          // });
                          res.json({
                            err: "El correo electrónico ya existe",
                          });
                          return;
                        } else {
                          //STORES DATA
                          index.orgboatDB.query(
                            "INSERT INTO usrs (name, usrname, email, password, verified, last_update, u_id, created, u_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)",
                            [
                              clName,
                              usrname,
                              email,
                              hashPwd,
                              verified,
                              dt,
                              uuid_numbr,
                              dt,
                            ],
                            (error, results) => {
                              if (error) {
                                throw error;
                              } else {
                                res.json({
                                  ok: "Nuevo usuario guardado con éxito",
                                });
                              }
                              console.log("New user saved!");
                              console.log(clName + usrname + email);
                              console.log(uuid_numbr);
                              mailer.verifyEmail(req, res, email, uuid_numbr);
                            }
                          ); //closes Insert New Usr Into Table
                        } //else
                      }
                    ); // Closes second query - email
                  } //closes else first query
                }
              ); //closes the vault first query - username
            } // Pwd do not match
            // mailer.verifyEmail(req, res, email, uuid_numbr);
          } else {
            // res.render("pages/subscribe", {
            //   opt: "Oops! Something went wrong while submitting the form.",
            //   opt1: "Log In",
            //   opt2: "/",
            // });
            res.json({
              ok: "Oops! Something went wrong while submitting the form.",
            });
          }
        }
      });
    }
  });
};

exports.workspace = function (req, res) {
  res.render("pages/workspace", {
    user: req.user[0],
    modo: req.user[0].theme ? "dark" : "",
  });
  //if (modo === "dark")
  //  res.render("pages/workspace", { user: req.user[0], modo: "dark" });
  //else res.render("pages/workspace", { user: req.user[0], modo: "" });
};

exports.editProfile = function (req, res) {
  var fullName = req.body.fullNameEditP;
  var avatar = req.body.avatarEditP;
  var city = req.body.cityEditP;
  var phone = req.body.phoneEditP;
  var website = req.body.websiteEditP;
  var isPublic = req.body.isPublicEditP;
  var about = req.body.aboutEditP;
  var email = req.user[0].email;
  var rqname = req.user[0].name;
  console.log(req.body);
  index.orgboatDB.query(
    "UPDATE usrs SET name = ?, city = ?, phone = ?, website = ?, public = ?, about = ?  WHERE email = ?",
    [fullName, city, phone, website, isPublic, about, email],
    (error, results) => {
      if (error) {
        res.redirect("/workspace");
        console.log(error);
      } else {
        res.redirect("/workspace");
        console.log(email);
      }
    }
  );
};

exports.savedbimage = async function (req, res) {
  return new Promise((resolve, reject) => {
    console.log(req.file);
    var photo = `uploads/${req.file.filename}`;
    // let dbx =  new Dropbox({accessToken:accesstokenDropbox})
    var uploadParams = { Bucket: "bucketeer-506dd049-2270-443e-b940-ab6a2c188752", Key: "", Body: "" };
    readStream("../build/" + photo)
      .then((data) => {
        uploadParams.Body = data;
        uploadParams.Key = req.file.filename;
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          if (data) {
            console.log("Upload Success", data.Location);
            photo = data.Location;
            var uidd = req.user[0].u_id;
            index.orgboatDB.query(
              "UPDATE usrs SET pphoto = ? WHERE u_id = ?",
              [photo, uidd],
              (error, results) => {
                if (error) {
                  //res.redirect("/workspace");
                  reject(error);
                  console.log(error);
                } else {
                  //res.redirect("/workspace");
                  resolve(photo);
                  console.log("Okay");
                }
              }
            );
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

  // readFileSync("../build/"+photo).then(data =>{
  //   console.log(data);
  //   dbx.filesUpload({path:"/"+photo,contents:data,autorename:false})
  //   .catch(err=>{
  //     console.log(err);
  //   });
  // });
};

exports.savedbimageGroup = async function (req, res) {
  return new Promise((resolve, reject) => {
    console.log(req.file);
    var photo = `uploads/${req.file.filename}`;
    // let dbx =  new Dropbox({accessToken:accesstokenDropbox})
    var uploadParams = { Bucket: "bucketeer-506dd049-2270-443e-b940-ab6a2c188752", Key: "", Body: "" };
    readStream("../build/" + photo)
      .then((data) => {
        uploadParams.Body = data;
        uploadParams.Key = "public/"+req.file.filename;
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          if (data) {
            console.log("Upload Success", data.Location);
            photo = data.Location;
            var uidd = req.body.chat_uid;
            index.orgboatDB.query(
              "UPDATE chats SET groupphoto = ? WHERE chat_uid = ?",
              [photo, uidd],
              (error, results) => {
                if (error) {
                  //res.redirect("/workspace");
                  reject(error);
                  console.log(error);
                } else {
                  //res.redirect("/workspace");
                  resolve(photo);
                  console.log("Okay");
                }
              }
            );
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.saveFileChat = async function (req, res) {
  return new Promise((resolve, reject) => {
    var photo = `uploads/${req.file.filename}`;
    // let dbx =  new Dropbox({accessToken:accesstokenDropbox})
    var uploadParams = { Bucket: "bucketeer-506dd049-2270-443e-b940-ab6a2c188752", Key: "", Body: "" };
    readStream("../build/" + photo)
      .then((data) => {
        uploadParams.Body = data;
        uploadParams.Key = req.file.filename;
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          if (data) {
            console.log("Upload Success", data.Location);
            resolve(data.Location);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.pphotourl = async function (req, res) {
  //console.log(req);
  var usrname = req;
  return new Promise((resolve, reject) => {
    index.orgboatDB.query(
      "SELECT pphoto FROM usrs WHERE name = " + usrname,
      function (err, result) {
        if (result.length < 1) return err ? reject(err) : resolve("");
        return err ? reject(err) : resolve(result[0].pphoto);
      }
    );
  });
};

exports.validateExistChat = async function (user_uid, contact_uid) {
  return new Promise((resolve, reject) => {
    index.orgboatDB.query(
      `SELECT chat_uid FROM chats_users WHERE u_id = '${contact_uid}'`,
      (err, contacts) => {
        index.orgboatDB.query(
          `SELECT chat_uid FROM chats_users WHERE u_id='${user_uid}'`,
          (err, chatuid) => {
            console.log(chatuid);
            console.log(contacts);
            const found = contacts.some((r) =>
              chatuid.some((u) => u.chat_uid === r.chat_uid)
            );
            //console.log(found);
            return resolve(found);
          }
        );
        //return err ? reject(err) : resolve(false);
      }
    );
  });
};

//call
exports.call = (req,res)=>{
  //console.log(req.body);
  const roomid =  uuid.v4();
  //console.log(`/call/${roomid}`);
  return res.status(200).json({roomid});
  //return res.redirect("/");
};