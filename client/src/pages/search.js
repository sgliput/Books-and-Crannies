import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import ResultArea from "../components/ResultArea";
import Modal1 from "../components/Modal/modal.js";
import "./style.css";

class Search extends Component {
    state = {
        currentBook: "",
        APILink: "https://www.googleapis.com/books/v1/volumes?q=",
        allInfo: [],
        showModal: "none",
        savedBook: {},
        notAlreadyThere: false,
        searchTerms: ""
    }

    componentDidMount() {
        console.log("Hello, world!");
    }

    handleInputChange = event => {
        //Changes this.state.currentBook to the content of the input box
        this.setState({
            currentBook: event.target.value
        });
        console.log(this.state.currentBook);
    };

    onSearch = event => {
        //Replaces spaces with plus signs in this.state.currentBook
        let queryTitle = this.state.currentBook.split(" ").join("+");
        //Gets Google Books using the API call by combining the base URL with the search terms
        API.getGoogleBook(this.state.APILink + queryTitle)
            .then(res => {
                console.log(this.state.APILink + queryTitle);
                //Maps the book data into an array of objects with all the pertinent information (title, authors, etc.)
                const bookResults = res.data.items.map(book => {
                    //Some books have no image link so this if statement keeps the code from breaking
                    if (book.volumeInfo.imageLinks) {
                        return {
                            title: book.volumeInfo.title,
                            id: book.id,
                            authors: book.volumeInfo.authors,
                            description: book.volumeInfo.description,
                            imageLink: book.volumeInfo.imageLinks.smallThumbnail,
                            link: book.volumeInfo.previewLink,
                            rating: book.volumeInfo.averageRating,
                            pageCount: book.volumeInfo.pageCount
                        }
                    } else {
                        return {
                            title: book.volumeInfo.title,
                            id: book.id,
                            authors: book.volumeInfo.authors,
                            description: book.volumeInfo.description,
                            link: book.volumeInfo.previewLink,
                            rating: book.volumeInfo.averageRating,
                            pageCount: book.volumeInfo.pageCount
                        }
                    }
                });
                //Adds the current book results and search terms to the state
                this.setState({
                    allInfo: bookResults,
                    searchTerms: this.state.currentBook
                });

            })
            .catch(err => console.log(err));
    };

    handleSave = event => {
        event.preventDefault();
        //Stores the save button data-id attribute to a variable
        const dataID = event.target.dataset.id;
        //Gets all books from the Mongo database using API call
        API.getBooks()
            .then(response => {
                console.log(response.data);
                //Maps all the book ids into an array of their own
                const savedArrayOfIDs = response.data.map(book => book.id);
                console.log(savedArrayOfIDs);
                //Gets the specific Google book using the book's specific id
                API.getGoogleBook("https://www.googleapis.com/books/v1/volumes/" + dataID)
                    .then(res => {
                        //Stores the index of the book's id number in the array of stored book ids; if it is not already in the database, it is -1
                        const idPosition = savedArrayOfIDs.indexOf(res.data.id);
                        console.log("res.data.id: " + res.data.id);
                        console.log("idPosition: " + idPosition);
                        //If idPosition is -1, meaning the book has not already been saved to the database
                        if (idPosition === -1) {
                            //This if statement allows for whether the book has an image link or not
                            if (res.data.volumeInfo.imageLinks) {
                                const bookToSave = {
                                    title: res.data.volumeInfo.title,
                                    id: res.data.id,
                                    authors: res.data.volumeInfo.authors,
                                    //Split and join methods remove all <p>, <b>, <i>, and <br> tags
                                    description: res.data.volumeInfo.description.split("<p>").join("").split("</p>").join("\n").split("<b>").join(" ").split("</b>").join(" ").split("<i>").join(" ").split("</i>").join(" ").split("<br>").join("\n"),
                                    image: res.data.volumeInfo.imageLinks.smallThumbnail,
                                    link: res.data.volumeInfo.previewLink,
                                    rating: res.data.volumeInfo.averageRating,
                                    pageCount: res.data.volumeInfo.pageCount
                                }
                                //Saves the book to the Mongo database and stores it in state too
                                API.saveBook(bookToSave)
                                    .then(res => {
                                        console.log(res);
                                        this.setState({ savedBook: res.data });
                                    })
                                    .catch(err => console.log(err));
                            } else {
                                const bookToSave = {
                                    title: res.data.volumeInfo.title,
                                    id: res.data.id,
                                    authors: res.data.volumeInfo.authors,
                                    //Split and join methods remove all <p>, <b>, <i>, and <br> tags from description
                                    description: res.data.volumeInfo.description.split("<p>").join("").split("</p>").join("\n").split("<b>").join(" ").split("</b>").join(" ").split("<i>").join(" ").split("</i>").join(" ").split("<br>").join("\n"),
                                    link: res.data.volumeInfo.previewLink,
                                    rating: res.data.volumeInfo.averageRating,
                                    pageCount: res.data.volumeInfo.pageCount
                                }
                                //Saves the book to the Mongo database and stores it in state too
                                API.saveBook(bookToSave)
                                    .then(res => {
                                        console.log(res);
                                        this.setState({ savedBook: res.data });
                                        console.log(this.state.savedBook);
                                    })
                                    .catch(err => console.log(err));
                            }
                            //Shows modal and indicates that book is not already in the database
                            this.setState({ 
                                showModal: "block",
                                notAlreadyThere: true
                             });
                             //If book is already in database, the modal is shown and told that the book is already there
                        } else{
                            console.log("Nope");
                            this.setState({ 
                                showModal: "block",
                                notAlreadyThere: false
                             });
                        }
                    });
            })
            .catch(err => console.log(err));
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
                <Container>
                    <Row>
                        <div className="searchRow">
                            <SearchForm onSearch={this.onSearch} handleChange={this.handleInputChange} />
                            <Link to={"/saved"}>
                                <button className="btn btn-info toSaved">See Your Saved Books</button>
                            </Link>
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <ResultArea results={this.state.allInfo} searchTerms={this.state.searchTerms} handleSave={this.handleSave} />
                        <br />
                    </Row>
                </Container>
                <Modal1 show={this.state.showModal} notAlreadyThere={this.state.notAlreadyThere} savedBook={this.state.savedBook} closeModal={this.closeModal} />
            </div>
        )

    }


}

export default Search;