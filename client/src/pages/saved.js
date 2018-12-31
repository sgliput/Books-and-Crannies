import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SavedArea from "../components/SavedArea";

class Saved extends Component {
    state = {
        savedBooks: [],
        id: ""
    }

    componentDidMount() {
        API.getBooks()
        .then(res => {
            console.log(res.data);
            this.setState({savedBooks: res.data});
            console.log(this.state.savedBooks);
        })
        .catch(err => console.log(err));
    };

    deleteBook = event => {
        this.setState({id: event.target.dataset.id});
        API.deleteBook(this.state.id)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      };

    render() {
        return (
            <div className="allIn">
                <Jumbotron>
                    <h1>Books and Crannies</h1>
                    <h3>A Tool to Find and Save the Books You Love</h3>
                </Jumbotron>
                <Container>
                    <Row>
                        <SavedArea results={this.state.savedBooks} id={this.state.id} deleteBook={this.deleteBook} />
                    </Row>



                </Container>
            </div>
        )

    }


}

export default Saved;