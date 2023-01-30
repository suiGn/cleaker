import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/logo.svg'

function PhoneCode() {

    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Enter code</h5>

            <form>
                <div className="form-group">
                    <input type="text" className="form-control text-center" placeholder="_ _ _ _ _" autoFocus/>
                </div>
                <button className="btn btn-primary btn-block">Confirm Code</button>
                <hr/>
                <p className="text-muted">Take a different action.</p>
                <a href="/sign-up" className="btn btn-sm btn-outline-light mr-1">Register now!</a>
                or
                <a href="/sign-in" className="btn btn-sm btn-outline-light ml-1">Login!</a>
            </form>
        </div>
    )
}

export default PhoneCode
