import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class Saved extends Component {
    state = {

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
                        

                    </Row>



                </Container>
            </div>
        )

    }


}

export default Saved;