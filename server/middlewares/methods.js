/**
▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
▐░▌▐░▌ ▐░▌▐░▌▐░▌               ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          
▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
▐░▌       ▐░▌▐░▌               ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌          ▐░▌
▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
 ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀ 
**/

//orgboat
//dependencies
const index = require("./index");

/**
██████  ███████  ██████  ███████ ██   ██ 
██   ██ ██      ██       ██       ██ ██  
██████  █████   ██   ███ █████     ███   
██   ██ ██      ██    ██ ██       ██ ██  
██   ██ ███████  ██████  ███████ ██   ██ 
**/ //EMAIL REGEX
const emailRegex = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
exports.emailRegex = emailRegex;
//USERNAME REGEX
const usrnmRegex = (usrname) => {
  var re = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(usrname);
};
exports.usrnmRegex = usrnmRegex;
//NAME REGEX
const nameRegex = (subname) => {
  var re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,21}$/u;
  return re.test(subname);
};
exports.nameRegex = nameRegex;

/**
 ██████  ██████  ██       ██████  ██████  ███████ 
██      ██    ██ ██      ██    ██ ██   ██ ██      
██      ██    ██ ██      ██    ██ ██████  ███████ 
██      ██    ██ ██      ██    ██ ██   ██      ██ 
 ██████  ██████  ███████  ██████  ██   ██ ███████                                                                                                   
**/

// Array with some colors
var colors = [
  "#a8d069",
  "#30ad64",
  "#25ccbf",
  "#20ac99",
  "#f8c740",
  "#e2a62b",
  "#face6a",
  "#e4b962",
  "#fd7072",
  "#cf404d",
  "#d39f9a",
  "#735260",
  "#af4173",
  "#822e50",
  "#e64c40",
  "#bf3a30",
  "#fc7d64",
  "#49647b",
];
// ... in random order
colors.sort(function (a, b) {
  return Math.random() > 0.5;
});

/**
██████   █████  ████████  █████      ██    ██  █████  ██      ██ ██████   █████  ████████ ██  ██████  ███    ██ 
██   ██ ██   ██    ██    ██   ██     ██    ██ ██   ██ ██      ██ ██   ██ ██   ██    ██    ██ ██    ██ ████   ██ 
██   ██ ███████    ██    ███████     ██    ██ ███████ ██      ██ ██   ██ ███████    ██    ██ ██    ██ ██ ██  ██ 
██   ██ ██   ██    ██    ██   ██      ██  ██  ██   ██ ██      ██ ██   ██ ██   ██    ██    ██ ██    ██ ██  ██ ██ 
██████  ██   ██    ██    ██   ██       ████   ██   ██ ███████ ██ ██████  ██   ██    ██    ██  ██████  ██   ████ 
**/ //Validate Subscribe Form
exports.subscribingData = function subscribingData(data) {
  var pckr = JSON.parse(data);

  function subVerificationRes(value, color, input, label, check) {
    index.io.to(index.guest).emit(
      "subData",
      JSON.stringify({
        value: value,
        rcolor: color,
        input: input,
        label: label,
        check: check,
      })
    );
  }

  if (pckr.code == "vName") {
    //Verify Name
    if (nameRegex(pckr.value)) {
      //Validate name
      subVerificationRes("", "#39D1BB", "inputName", "#labelName", "g"); //ValidName
    } else {
      subVerificationRes(
        "Invalid Name!",
        "#ff6666",
        "inputName",
        "#labelName",
        "ni"
      );
    }
  } // VERIFY NAME CLOSURE
  else if (pckr.code == "vUser") {
    //Validate Username
    if (usrnmRegex(pckr.value)) {
      index.orgboatDB.query(
        "SELECT usrname FROM usrs WHERE usrname = ?",
        [pckr.value],
        (err, res) => {
          if (res.length >= 1) {
            subVerificationRes(
              "Username already taken!",
              "#ff6666",
              "inputUsername",
              "#labelUsername",
              "ut"
            );
          } else {
            subVerificationRes(
              "",
              "#39D1BB",
              "inputUsername",
              "#labelUsername",
              "g"
            ); //validUsername
          }
        }
      );
    } else {
      subVerificationRes(
        "Invalid Username!",
        "#ff6666",
        "inputUsername",
        "#labelUsername",
        "ui"
      );
    }
  } // VALID USERNAME CLOSURE
  else if (pckr.code == "vEmail") {
    //Validate Email
    if (emailRegex(pckr.value)) {
      index.orgboatDB.query(
        "SELECT email FROM usrs WHERE email = ?",
        [pckr.value],
        (err, res) => {
          if (res.length >= 1) {
            subVerificationRes(
              "Email already taken!",
              "#ff6666",
              "inputEmail",
              "#labelEmail",
              "et"
            );
          } else {
            subVerificationRes("", "#39D1BB", "inputEmail", "#labelEmail", "g"); //validEmail
          }
        }
      );
    } else {
      subVerificationRes(
        "Invalid Email!",
        "#ff6666",
        "inputEmail",
        "#labelEmail",
        "ei"
      );
    }
  } //VALID EMAIL CLOSURE
};
