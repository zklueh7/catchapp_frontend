import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import CatchAppApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function EditProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
    lookingForPartners: currentUser.lookingForPartners,
    climbingType: currentUser.climbingType,
    experienceLevel: currentUser.experienceLevel,
    pictureUrl: currentUser.pictureUrl
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      lookingForPartners: formData.lookingForPartners,
      climbingType: formData.climbingType,
      experienceLevel: formData.experienceLevel,
      pictureUrl: formData.pictureUrl
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await CatchAppApi.updateProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
    navigate("/profile");
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="container text-center col-md-6 offset-md-3 col-lg-6 offset-lg-3">
      <div className="card-body">
        <h3 className="heading">Edit {formData.username}'s Profile</h3>
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Looking for partners?</label>
            <input
              name="lookingForPartners"
              className="form-control"
              value={formData.lookingForPartners}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Climbing Type:</label>
            <input
              name="climbingType"
              className="form-control"
              value={formData.climbingType}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Experience Level:</label>
            <input
              name="experienceLevel"
              className="form-control"
              value={formData.experienceLevel}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Picture URL:</label>
            <input
              name="pictureUrl"
              className="form-control"
              value={formData.pictureUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm password to make changes:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}

          {saveConfirmed
            ?
            <Alert type="success" messages={["Updated successfully."]} />
            : null}

          <button
            className="btn btn-primary btn-block mt-2"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
