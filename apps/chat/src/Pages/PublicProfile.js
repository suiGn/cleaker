import React, { useEffect, useState } from "react";
// import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logo } from "../assets/icons/blue_helm2.svg";
import axios from "axios";

function PublicProfile() {
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const url = require("url").parse(window.location.href, true);
  let usrname = url.query.usrname ? url.query.usrname : "";
  useEffect(() => {
    if (usrname != "") {
      setOpt1("Error");
      setOpt2("No info");
      let user = {
        usrname: usrname,
      };
      axios.post("/publicUser", user).then((res) => {
        setOpt1(res.data.opt1);
        let initial;
        if (res.data.opt2 === "" || res.data.opt2 === null) {
            initial = res.data.opt1.substring(0, 1);
            setOpt2(
              <span className="avatar-title bg-info rounded-circle">
                {initial}
              </span>
            );
          } else {
            setOpt2(<img src={res.data.opt2} className="rounded-circle" alt="image" />);
          }
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
            <div className="profile-image-holder rounded-circle mb-4">
                <figure className="avatar">
                    {opt2}
                </figure>
            </div>
            <div className="form-group">
            </div>
        </div>
        }
    </div>
  );
}

export default PublicProfile;
