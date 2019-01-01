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
        API.getBooks()
            .then(res => {
                console.log(res.data);
                this.setState({ savedBooks: res.data });
                console.log(this.state.savedBooks);
            })
            .catch(err => console.log(err));
    };

    deleteBook = event => {
        this.setState({ id: event.target.dataset.id });
        const dataID = event.target.dataset.id;
        API.getBook(dataID)
            .then(res => {
                this.setState({ deletedBook: res.data });

                API.deleteBook(dataID)
                    .then(res => {
                        console.log(res);
                        this.setState({ showModal: "block" });
                        API.getBooks()
                            .then(res => {
                                this.setState({ savedBooks: res.data });
                            })
                    })
                    .catch(err => console.log(err));
            })
    };

    //Handles hiding both modals when their X's are clicked
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
                <Container>
                    <Row>
                        <Link to={"/"}>
                            <button className="toSearch">Back to Searching</button>
                        </Link>
                    </Row>
                    <br />
                    <Row>
                        <SavedArea results={this.state.savedBooks} id={this.state.id} deleteBook={this.deleteBook} />
                    </Row>
                </Container>
                <Modal2 show={this.state.showModal} deletedBook={this.state.deletedBook} closeModal={this.closeModal} />
            </div>
        )

    }


}

export default Saved;