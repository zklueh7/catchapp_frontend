import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CatchAppApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Search.css";

/** Show page with list of areas.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * AreaList -> AreaCardList -> AreaCard
 *
 * This is routed to at /areas
 */

function Search() {
  const [areas, setAreas] = useState(null);

  useEffect(function getAllAreasOnMount() {
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(handle) {
    let areas = await CatchAppApi.getAreas(handle);
    console.log(areas);
    setAreas(areas);
  }
  if (!areas) return <LoadingSpinner />;

  return (
    <div className="container col-md-6 offset-md-3 col-lg-6 offset-lg-3">
      <div className="card-body">
        <SearchBar searchFor={search} />
        <div className="area-results">
          {areas.length
            ? areas.map(area => (<Link className="area-link" to={{ pathname: `/areas/${area.name}` }}>{area.title}</Link>))
            : <p>Sorry, no results were found!</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Search;
