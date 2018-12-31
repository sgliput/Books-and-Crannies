import React from "react";
import "./searchForm.css";

// This file exports the SearchForm component

function SearchForm(props) {
  return (
    <div className="form-group searchForm">
    <label>Search Google Books</label>
      <input className="form-control searchField" placeholder="Type in the desired book name" onChange={(e) => props.handleChange(e)} />
      <br />
      <button className="btn btn-success search" onClick={(e) => props.onSearch(e)}>Search</button>
    </div>
  );
}

export default SearchForm;
