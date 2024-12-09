import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function HomepageUser() {

    const { currentUser } = useContext(UserContext);

    return (
        <div className="outer-homepage">
            <div className="card-body">
                <h3 className="heading">Find your next catch today {currentUser.username}!</h3>
                <img className="falling-gif" src="https://25.media.tumblr.com/55a1be4296cc5516f9ea9ade216e99c0/tumblr_mrdbw8H48e1sx0siio1_400.gif"></img>
            </div>
        </div>

    );
}

export default HomepageUser;
