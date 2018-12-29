import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import ResultArea from "../components/ResultArea";

class Search extends Component {
    state = {
        currentBook: "",
        APILink: "https://www.googleapis.com/books/v1/volumes?q=",
        allInfo: []
    }

    componentDidMount() {
        API.getGoogleBook("https://www.googleapis.com/books/v1/volumes?q=flowers+for+algernon")
            .then(res => {
                for (var i = 0; i < res.data.items.length; i++) {
                    console.log("==========================");
                    console.log("Title: " + res.data.items[i].volumeInfo.title);
                    console.log("ID: " + res.data.items[i].id);
                    console.log("Author(s): " + res.data.items[i].volumeInfo.authors);
                    console.log("Description: " + res.data.items[i].volumeInfo.description);
                    console.log("Thumbnail Link: " + res.data.items[i].volumeInfo.imageLinks.smallThumbnail);
                    console.log("Link: " + res.data.items[i].volumeInfo.previewLink);
                    console.log("Average Rating: " + res.data.items[i].volumeInfo.averageRating);
                    console.log("Page Count: " + res.data.items[i].volumeInfo.pageCount);
                }
                //console.log(res.data.items);
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({
            currentBook: event.target.value
        });
        console.log(this.state.currentBook);
    };

    onSearch = event => {
        let queryTitle = this.state.currentBook.split(" ").join("+");

        API.getGoogleBook(this.state.APILink + queryTitle)
            .then(res => {

                const bookResults = res.data.items.map(book => {
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
                console.log(bookResults);

                this.setState({
                    APILink: this.state.APILink + queryTitle,
                    allInfo: bookResults
                });

            })
            .catch(err => console.log(err));
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
                        <SearchForm onSearch={this.onSearch} handleChange={this.handleInputChange} />
                    </Row>
                    <br />
                    <Row>
                        <ResultArea results={this.state.allInfo} />
                    </Row>



                </Container>
            </div>
        )

    }


}

export default Search;