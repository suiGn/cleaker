import React, { useEffect, useState } from "react";
// import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logo } from "../assets/icons/blue_helm2.svg";
import axios from "axios";

function ValidateEmail() {
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const url = require("url").parse(window.location.href, true);
  let em = url.query.em ? url.query.em : "";
  let uuid = url.query.uuid ? url.query.uuid : "";
  useEffect(() => {
    if (em != "" && uuid != "") {
      setOpt1("Verifying Email.");
      setOpt2("Please wait.");
      let user = {
        em: em,
        uuid: uuid,
      };
      axios.post("/verMail", user).then((res) => {
        setOpt1(res.data.opt1);
        setOpt2(res.data.opt2);
      });
    }
    document.body.classList.add("form-membership");
  }, []);

  return (
    <div>
      {
        <div className="form-wrapper">
          <div className="logo">
            <Logo />
          </div>
          <h5>{opt1}</h5>
          <p>{opt2}</p>
          <div className="form-group">
            <br />
            <a href="/sign-in" className="btn btn-outline-light btn-sm">
              Sign in!
            </a>
          </div>
        </div>
      }
    </div>
  );
}

export default ValidateEmail;
