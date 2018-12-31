import React from "react";
import "./savedarea.css";

// This file exports the SavedArea component

function SavedArea(props) {

    const resultCards = props.results.map(book => (
        <div className="card" key={book.id}>
            <div className="topRow">
                <button className="btn btn-success delete" data-id={book.id} onClick={(e) => props.deleteBook(e)}>Delete Yes</button>
                <img className="thumbnail" alt={book.title} src={book.image} />
                <a href={book.link} className="title"><h4>{book.title}</h4></a>
                {book.authors ? <p>{book.authors.length > 1 ? "Authors" : "Author"}: {book.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
                {book.description ? <p>Description: {book.description.split("</i>").join("")}</p> : <p className="unavailable">Description Unavailable</p>}
                {book.rating ? <p>Average Rating: {book.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
                <p>Page Count: {book.pageCount}</p>
            </div>

        </div>
    ));

    return (
        <div className="SavedArea">
            <label>Your Saved Google Books:</label>
            {resultCards}
        </div>
    );
}

export default SavedArea;