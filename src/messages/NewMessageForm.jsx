import React, { useState } from "react";
import { Link } from "react-router-dom";
import CatchAppApi from "../api/api";

/** New message form.
 *
 * Add a new message to a message board
 * 
 */

function NewMessageForm({ area, user }) {
  const [formData, setFormData] = useState({
    messageText: "",
    area: area,
    fromUser: user,
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to homepage.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await CatchAppApi.postMessage(formData);
    formData.messageText = "";
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
        <div className="card-body msg-send">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Send a message!</label>
              <input
                name="messageText"
                className="form-control"
                value={formData.messageText}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null
            }

            <button
              type="submit"
              className="btn btn-secondary btn-sm float-right"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
  );
}

export default NewMessageForm;