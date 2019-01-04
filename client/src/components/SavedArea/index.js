import React from "react";
import "./savedarea.css";

// This file exports the SavedArea component

function SavedArea(props) {

    const resultCards = props.results.map(book => (
        <div className="card" key={book.id}>
            <div className="topRow">
            {/*Delete button with the book's id and the deleteBook function*/}
                <button className="btn btn-danger delete" data-id={book.id} onClick={(e) => props.deleteBook(e)}>Delete</button>
                {/*Thumbnail image and book title, with link to Google Book source*/}
                <img className="thumbnail" alt={book.title} src={book.image} />
                <a href={book.link} className="title"><h4>{book.title}</h4></a>
                {/*If there is no author, "Author Unknown" is shown; if there's one author or no author, the name is preceded by "Author:"; and if there is more than one author, the names are separated by commas and preceded by "Authors:" */}
                {book.authors ? <p>{book.authors.length > 1 ? "Authors" : "Author"}: {book.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
                {/*If there is a description or a rating, they are shown; if not, a default Unavailable message appears; the page count appears regardless*/}
                {book.description ? <p>Description: {book.description}</p> : <p className="unavailable">Description Unavailable</p>}
                {book.rating ? <p>Average Rating: {book.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
                <p>Page Count: {book.pageCount}</p>
            </div>

        </div>
    ));

    return (
        <div className="savedArea">
            <h3>Your Saved Google Books:</h3>
            {resultCards}
        </div>
    );
}

export default SavedArea;