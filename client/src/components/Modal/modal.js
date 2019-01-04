import React from "react";
import "./modal.css";


function Modal(props) {

    return (
        <div id="saveModal" className="modal" style={{ display: `${props.show}` }}>
            <div className="modal-content">
                {/* If the book is not already there in the Mongo database, the saved book information is displayed in the modal */}
                {props.notAlreadyThere ? (
                    <div>
                        <div className="modal-header">
                            <h2>You just saved a book!</h2>
                            <span className="close" onClick={props.closeModal}>&times;</span>

                        </div>
                        <div className="modal-body">
                            <img className="thumbnail" alt={props.savedBook.title} src={props.savedBook.image} />
                            <a href={props.savedBook.link} className="title"><h4>{props.savedBook.title}</h4></a>
                            {props.savedBook.authors ? <p>{props.savedBook.authors.length > 1 ? "Authors" : "Author"}: {props.savedBook.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
                            {props.savedBook.description ? <p>Description: {props.savedBook.description.split("</i>").join("")}</p> : <p className="unavailable">Description Unavailable</p>}
                            {props.savedBook.rating ? <p>Average Rating: {props.savedBook.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
                            <p>Page Count: {props.savedBook.pageCount}</p>
                        </div>
                    </div>
                ) : (
                        < div className="modal-body">
                            {/* If the book is already in the database, a simple message saying so appears in the modal. */}
                            <span className="close" onClick={props.closeModal}>&times;</span>
                            <h2>This book is already saved.</h2>
                        </div>
                    )}
            </div>
        </div>
    );
}


export default Modal;