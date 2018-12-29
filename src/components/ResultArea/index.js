import React from "react";
import "./results.css";

// This file exports the SearchForm component

function ResultArea(props) {

    const resultCards = props.results.map(book => (
        <div className="card" key={book.id}>
            <a href={book.link}><h4>Title: {book.title}</h4></a>
            <p>Author(s): {book.authors}</p>
            <p>Description: {book.description}</p>
            <p>Average Rating: {book.rating}</p>
            <p>Page Count: {book.pageCount}</p>
            <img className="thumbnail" alt={book.title} src={book.imageLink} />

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
