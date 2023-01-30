const multer = require("multer");
const storage = multer.diskStorage({
    //Fun
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      //console.log(file);
      var filetype = "";
      if (file.mimetype === "image/gif") {
        filetype = "gif";
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
      }
      cb(
        null,
        "avatar-" + req.user[0].u_id + "-" + Date.now() + "." + filetype
      );
    },
  });
const upload = multer({ storage: storage });
module.exports = {
    upload
  };
  