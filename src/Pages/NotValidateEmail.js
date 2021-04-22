import React, { useEffect, useState } from "react";
// import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logo } from "../assets/icons/blue_helm2.svg";
import axios from "axios";

function NotValidateEmail() {
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [validateMail, setValidateMail] = useState(0);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const url = require("url").parse(window.location.href, true);
  let em = url.query.em ? url.query.em : "";
  let uuid = url.query.uuid ? url.query.uuid : "";
  useEffect(() => {
    document.body.classList.add("form-membership");
  }, []);

  function resendEmail(e) {
    e.preventDefault();
    const body = {
      uuid: uuid,
      em: em,
    };
    axios
      .post("/resnd?uuid=" + uuid + "&em=" + em, body)
      .then((res) => {
        setResponse("Se reenvío con éxito");
      })
      .catch(() => {
        setError("Hubo un error favor de intentarlo nuevamente");
      });
  }

  return (
    <div>
      {
        <div className="form-wrapper">
          <div className="logo">
            <Logo />
          </div>
          {response ? (
            <div class="text-success ">{response}</div>
          ) : (
            <div class="text-error">{error}</div>
          )}
          <h5>Email Verification Required</h5>
          <p>Please check your email to verify it.</p>
          <div className="form-group">
            <button
              onClick={resendEmail}
              className="btn btn-outline-light btn-sm mb-3"
            >
              Re-send Verification Link.
            </button>
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

export default NotValidateEmail;
