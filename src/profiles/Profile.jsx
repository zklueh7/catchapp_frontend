import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import CatchAppApi from "../api/api";
import "./Profile.css";
import miscClimber from "../imgs/misc_climber.jpg";

/** User profile page
 *
 * Shows user profile details and 
 * link to profile editing form
 * 
 */

function Profile() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="outer-profile">
      <div className="card-body">
        <h3 className="heading">My Profile</h3>
        <img src={currentUser.pictureUrl ? currentUser.pictureUrl : miscClimber} className="prof-img"></img>
        <p>Username: {currentUser.username}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Last Name: {currentUser.lastName}</p>
        <p>Email: {currentUser.email}</p>
        <p>Looking for partners? {currentUser.lookingForPartners}</p>
        <p>Climbing Type: {currentUser.climbingType}</p>
        <p>Experience Level: {currentUser.experienceLevel}</p>
        <p>
          <Link className="btn" to="/edit-profile-form">
            Edit Profile
          </Link>
          <Link className="btn" to="/delete-profile-form">
            Delete Profile
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Profile;
