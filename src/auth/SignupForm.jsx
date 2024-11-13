import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    lookingForPartners: "",
    climbingType: "",
    experienceLevel: "",
    pictureUrl: ""
  });
  const [formErrors, setFormErrors] = useState([]);


  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to homepage.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="container">
      <div className="card-body">
        <h3 className="heading">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="username"
              placeholder="Username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              name="firstName"
              placeholder="First Name"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="lookingForPartners"
              placeholder="Looking for partners?"
              className="form-control"
              value={formData.lookingForPartners}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="climbingType"
              placeholder="Climbing type?"
              className="form-control"
              value={formData.climbingType}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="experienceLevel"
              placeholder="Experience level?"
              className="form-control"
              value={formData.experienceLevel}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="pictureUrl"
              placeholder="Picture URL"
              className="form-control"
              value={formData.pictureUrl}
              onChange={handleChange}
            />
          </div>
          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null
          }

          <button
            type="submit"
            className="btn submit-btn"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;