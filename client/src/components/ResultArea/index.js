import React from "react";
import ReactTooltip from 'react-tooltip'
import "./results.css";

// This file exports the ResultArea component

function ResultArea(props) {


    const resultCards = props.results.map(book => (
        <div className="card" key={book.id}>
            <div className="topRow">
             {/*Save button with the book's id and the handleSave function*/}
                <button className="btn btn-success save" data-id={book.id} onClick={(e) => props.handleSave(e)}>Save</button>
                 {/* Thumbnail image */}
                <img className="thumbnail" alt={book.title} src={book.imageLink} />
                {/* Book title, with link to Google Book source and with tooltip when hovered upon */}
                <a href={book.link} className="titleLink" target="blank"><h4 className="title" data-tip="Click here to check out the Google Book">{book.title}</h4></a>
                {/*If there is no author, "Author Unknown" is shown; if there's one author or no author, the name is preceded by "Author:"; and if there is more than one author, the names are separated by commas and preceded by "Authors:" */}
                {book.authors ? <p>{book.authors.length > 1 ? "Authors" : "Author"}: {book.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
                {/*If there is a description or a rating, they are shown; if not, a default Unavailable message appears; the page count appears regardless*/}
                {book.description ? <p>Description: {book.description}</p> : <p className="unavailable">Description Unavailable</p>}
                {book.rating ? <p>Average Ratings: {book.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
                <p>Page Count: {book.pageCount}</p>
            </div>
            <ReactTooltip />

        </div>
    ));

    return (
        <div>
            {/* The resultArea only appears if there are results to display */}
            {props.results.length > 0 ?
                <div className="resultArea">
                    <h3>Results for "{props.searchTerms}" from Google Books:</h3>
                    {resultCards}
                </div>
                : ""}
        </div>
    );
}

export default ResultArea;
