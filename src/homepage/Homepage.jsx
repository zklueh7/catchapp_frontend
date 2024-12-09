import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import HomepageAnon from "./HomepageAnon";
import HomepageUser from "./HomepageUser";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({ login }) {
  const { currentUser } = useContext(UserContext);


  return (
    <div>
      {currentUser
        ? <HomepageUser />
        : <HomepageAnon login={login} />
      }
    </div>
  );
}

export default Homepage;
