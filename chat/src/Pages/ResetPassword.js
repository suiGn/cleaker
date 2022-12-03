import React, { useEffect, useState } from "react";
// import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Logo } from "../assets/icons/blue_helm2.svg";
import axios from "axios";

function ResetPassword() {
  useEffect(() => document.body.classList.add("form-membership"), []);
  const [rstEmail, setMail] = useState("");
  const [response, setResponse] = useState("");
  function handleChange(e) {
    setMail(e.target.value);
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setSubmit(true);
  //   if (!rstEmail) {
  //     return;
  //   }
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ rstEmail }),
  //   };
  //   (async () => {
  //     const response = await fetch("/rstpwd", requestOptions);
  //     const data = await response.json();
  //     setOk(data.ok);
  //     console.log(data.ok);
  //     if (data.ok) {
  //       setMesage("Please check your inbox to reset your password");
  //       //return(<Response mgs="Please check your inbox to reset your password" msg2 ="Sent Successfully"/>)
  //     } else {
  //       //return(<Response mgs="Please try again." msg2 ="Error"/>)
  //     }
  //   })();
  // }

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      rstEmail: rstEmail,
    };
    axios.post("/rstpwd", body).then((res) => {
      setResponse(res.data);
    });
  }

  return (
    <div className="form-wrapper">
      <div className="logo">
        <Logo />
      </div>
      <h5>Reset password</h5>
      {response.err ? (
        <div class="text-error">{response.err}</div>
      ) : (
        <div class="text-success ">{response.ok}</div>
      )}
      <form name="reset" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
            name="rstEmail"
            value={rstEmail}
            onChange={handleChange}
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
