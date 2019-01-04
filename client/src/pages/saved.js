import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SavedArea from "../components/SavedArea";
import Modal2 from "../components/Modal/modal2.js";

class Saved extends Component {
    state = {
        savedBooks: [],
        id: "",
        showModal: "none",
        deletedBook: {}
    }

    componentDidMount() {
        //Gets all books from Mongo database using API call
        API.getBooks()
            .then(res => {
                console.log(res.data);
                //Stores all saved books in state
                this.setState({ savedBooks: res.data });
                console.log(this.state.savedBooks);
            })
            .catch(err => console.log(err));
    };

    deleteBook = event => {
        //Stores id of book being deleted in state and in a variable
        this.setState({ id: event.target.dataset.id });
        const dataID = event.target.dataset.id;
        //Gets the data for the specific book being deleted
        API.getBook(dataID)
            .then(res => {
                //Stores that deletedBook's data in state to show in modal
                this.setState({ deletedBook: res.data });
                //Deletes book from Mongo database
                API.deleteBook(dataID)
                    .then(res => {
                        console.log(res);
                        //Shows modal
                        this.setState({ showModal: "block" });
                        //Gets all saved books again, updating them after the deletion and re-storing them in state
                        API.getBooks()
                            .then(res => {
                                this.setState({ savedBooks: res.data });
                            })
                    })
                    .catch(err => console.log(err));
            })
    };

    //Handles hiding modal when its X is clicked
    closeModal = () => {
        this.setState({ showModal: "none" });
    }

    render() {
        return (
            <div className="allIn">
                <Jumbotron>
                    <h1>Books and Crannies</h1>
                    <h3>A Tool to Find and Save the Books You Love</h3>
                </Jumbotron>
                <br />
                <Container>
                    <Row>
                        <Link to={"/"}>
                            <button className="btn btn-info toSearch">Back to Searching</button>
                        </Link>
                    </Row>
                    <br />
                    <Row>
                        <SavedArea results={this.state.savedBooks} id={this.state.id} deleteBook={this.deleteBook} />
                        <br />
                    </Row>
                </Container>

                <Modal2 show={this.state.showModal} deletedBook={this.state.deletedBook} closeModal={this.closeModal} />
            </div>
        )

    }


}

export default Saved;