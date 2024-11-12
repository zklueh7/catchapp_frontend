import React, { useState } from "react";
import "./Search.css";

/** Search widget.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 */

function SearchBar({ searchFor }) {

  const [searchTerm, setSearchTerm] = useState("");

  /** Update form fields and tell parent to search */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
    searchFor(evt.target.value.trim() || undefined);
  }

  return (
      <div className="SearchForm">
        <form className="form-inline">
          <input
              className="form-control"
              name="searchTerm"
              placeholder="Search for an area..."
              value={searchTerm}
              onChange={handleChange}
          />
        </form>
      </div>
  );
}

export default SearchBar;
