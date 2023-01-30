import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/logo.svg'
import WomenAvatar from '../assets/img/women_avatar5.jpg'

function LockScreen() {

    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Enter your password</h5>

            <form>
                <div className="form-group d-flex align-items-center">
                    <div className="mr-3">
                        <figure className="mb-4 avatar">
                            <img src={WomenAvatar} className="rounded-circle" alt="avatar"/>
                        </figure>
                    </div>
                    <input type="password" className="form-control" placeholder="Password" required autoFocus/>
                </div>
                <button className="btn btn-primary btn-block">Sign in</button>
                <hr/>
                <a href="/sign-in" className="btn btn-sm btn-outline-light ml-1">Sign out</a>
            </form>
        </div>
    )
}

export default LockScreen
