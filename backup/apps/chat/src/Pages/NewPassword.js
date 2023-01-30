import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/icons/blue_helm2.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  useEffect(() => document.body.classList.add("form-membership"), []);
  const [response, setResponse] = useState("");
  const [pwrd, setPwrd] = useState("");
  const [pwrd2, setPwrd2] = useState("");
  const history = useHistory();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let uuid = params.get("uuid");
  let em = params.get("em");

  if (!uuid && !em) {
    history.push("sign-in");
  }

  console.log(em, uuid);

  const handleChangePwd = (event) => {
    setPwrd(event.target.value);
  };
  const handleChangePwd2 = (event) => {
    if (pwrd === event.target.value) {
      event.target.setCustomValidity("");
      setPwrd2(event.target.value);
      setTimeout(function () {
        history.push("sign-in");
      }, 3000);
    } else {
      event.target.setCustomValidity(
        "La contraseña puesta no concuerda con la puesta anteriormente"
      );
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      uuid: uuid,
      email: em,
      password: pwrd,
      rtpass: pwrd2,
    };

    axios.post("/resetPwd", body).then((res) => {
      console.log(res);
      setResponse(res.data);
    });
  }

  return (
    <div className="form-wrapper">
      <div className="logo">
        <Logo />
      </div>
      <h5>Choose New Password</h5>
      {response.err ? (
        <div class="text-error">{response.err}</div>
      ) : (
        <div class="text-success ">{response.ok}</div>
      )}
      <form name="reset" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            name="password"
            minlength={4}
            className="form-control"
            placeholder="Choose New Password"
            onChange={handleChangePwd}
            maxLength={21}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="rtpass"
            minlength={4}
            className="form-control"
            onChange={handleChangePwd2}
            placeholder="Re-type Password"
            maxLength={21}
            required
          />
        </div>
        <button className="btn btn-primary btn-block">Submit</button>
        <hr />
        <p className="text-muted">Take a different action.</p>
        <a href="/sign-up" className="btn btn-sm btn-outline-light mr-1">
          Register now!
        </a>
        or
        <a href="/sign-in" className="btn btn-sm btn-outline-light ml-1">
          Login!
        </a>
      </form>
    </div>
  );
}

export default ResetPassword;
