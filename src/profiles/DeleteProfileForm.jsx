import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import CatchAppApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile deleting form.
 *
 * Displays message asking if the user is sure they want to delete
 *
 * Routed as /profile-delete-form
 */

function DeleteProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
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
      password: formData.password,
    };

    let username = currentUser.username;

    try {
      await CatchAppApi.deleteProfile(username);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(null);
    navigate("/");
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
        <h3 className="text-center mt-2">Delete Profile</h3>
        <div className="card">
          <div className="card-body">
            <p>Are you sure you want to leave CatchApp?</p>
            <form>
              <div className="form-group">
                <label>Confirm password to delete:</label>
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
                  className="btn btn-danger btn-block mt-2"
                  onClick={handleSubmit}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default DeleteProfileForm;
