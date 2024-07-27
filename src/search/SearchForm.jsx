import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="SearchForm mb-3">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-md flex-grow-1"
              name="searchTerm"
              placeholder="Search for an area.."
              value={searchTerm}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-md btn-primary">
            Submit
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
