import React from "react";
import "./modal.css";


function Modal2(props) {

return (
    <div id="deleteModal" className="modal" style={{display: `${props.show}`}}>
        <div className="modal-content">
            <div className="modal-header">
            <h2>You just deleted this book.</h2>
                <span className="close" onClick={props.closeModal}>&times;</span>
            </div>
            {/* Displays deleted book information in modal */}
            <div className="modal-body">
            <img className="thumbnail" alt={props.deletedBook.title} src={props.deletedBook.image} />
            <a href={props.deletedBook.link} className="title"><h4>{props.deletedBook.title}</h4></a>
            {props.deletedBook.authors ? <p>{props.deletedBook.authors.length > 1 ? "Authors" : "Author"}: {props.deletedBook.authors.toString().split(",").join(", ")}</p> : <p className="unavailable">Author Unknown</p>}
            {props.deletedBook.description ? <p>Description: {props.deletedBook.description.split("</i>").join("")}</p> : <p className="unavailable">Description Unavailable</p>}
            {props.deletedBook.rating ? <p>Average Rating: {props.deletedBook.rating}</p> : <p className="unavailable">Rating Unavailable</p>}
            <p>Page Count: {props.deletedBook.pageCount}</p>
                 
            </div>
        </div>
    </div>
);
}


export default Modal2;