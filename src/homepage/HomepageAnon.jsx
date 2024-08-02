import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import "./Homepage.css";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function HomepageAnon({ login }) {

    return (
        <div>
            <h1 className="heading">CatchApp</h1>
            <h6 className="subheading">Log in or create an account to find your next climbing partner today! </h6>
            <div className="card-body col-md-6 offset-md-3 col-lg-4 offset-lg-4 login">
                    <LoginForm login={login} />
                    <h2 className="or"><span>OR</span></h2>
                    <Link className="btn"
                        to="/signup">
                        Sign up
                    </Link>
            </div>
        </div>

    );
}

export default HomepageAnon;
