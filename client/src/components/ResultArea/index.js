import React from "react";
import "./results.css";

// This file exports the SearchForm component

function ResultArea(props) {


    const resultCards = props.results.map(book => (
        <div className="card" key={book.id}>
            <div className="topRow">
                <button className="btn btn-success save" data-id={book.id} onClick={(e) => props.handleSave(e)}>Save</button>
                <img className="thumbnail" alt={book.title} src={book.imageLink} />
                <a href={book.link} className="title"><h4>{book.title}</h4></a>
                {book.authors ? <p>{book.authors.length > 1 ? "Authors" : "Author"}: {book.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
                {book.description ? <p>Description: {book.description}</p> : <p className="unavailable">Description Unavailable</p>}
                {book.rating ? <p>Average Rating: {book.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
                <p>Page Count: {book.pageCount}</p>
            </div>

        </div>
    ));

    return (
        <div className="resultArea">
            <label>Results from Google Books:</label>
            {resultCards}
        </div>
    );
}

export default ResultArea;
