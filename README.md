# Books-and-Crannies

## Deployed App

https://quiet-dawn-14214.herokuapp.com/

## Overview

Books and Crannies is a full-stack React app for searching for books using the Google Books API and saving them to a MongoDB database. It employs Bootstrap styling, an Express server, React rendering, and Mongoose database modeling. The NPM packages used in the main folder's package.json are these:

* axios,
* express,
* mongoose, and
* if-env,

while the NPM packages used in the client's package.json are these:

* axios,
* react,
* react-dom,
* react-router-dom,
* react-scripts, and
* react-tooltip.

## User Experience

The home page is initially a header, a simple input field for searches, and a button for switching to the Saved Google Books page. When a user types into the search field and hits the Search button, the input value is added to an API call to the Google Books API, which returns an array of ten related book objects. Each of these book objects is rendered as a card with a "Save" button and the data worth saving to the database, which includes

* the book title,
* which has a link to the actual Google Book,
* an image src URL displayed as an image on the left side,
* the book author(s),
* the book description,
* the average rating, and
* the number of pages.

The first four are almost always returned, but, if any of the latter three are not, they default to an "Unavailable" message. If more than one author is returned, they are presented as a comma-separated list. Hovering over the linked book title triggers a tooltip to let users know that they can "Click here to check out the Google Book."

Clicking the save button triggers a custom pop-up modal, which contains all the same information for the book and tells the user it has been saved to the database. Clicking the "See Your Saved Books" button switches to the saved page, where every book in the database is displayed as similar cards with all the same information from the search page's cards. Instead of a "Save" button, each card has a "Delete" button, which removes that book from the database and triggers a modal with that book's information to tell the user it has been deleted.

## Behind the Scenes

This React app has two pages, "/search" and "/saved," which utilize the following React component folders:

* Grid, which is three components for handling Bootstrap containers, rows, and columns;
* Jumbotron, for both pages' header;
* SearchForm, for the middle of the "/search" page where the user types search parameters;
* ResultArea, for displaying the results of the search as cards on the "/search" page;
* SavedArea, for displaying the saved books as cards on the "/saved" page; and
* Modal, which is two separate modals, one for the "/search" page and one for the "/saved" page.

The API calls using axios are stored in the API.js file in the client/src/utils folder. These calls use the routes established in the routes folder, which reference the mongoose methods stored in controllers/booksController.js (findAll, findById, create, and remove).

The Mongoose model (bookSchema) allows only the following property keys for storing in the Mongo database:

* title, which is a String and required,
* id, which is required and must be unique (this is the book id from the Google Books API),
* authors, which is an array,
* description (String), if any,
* image, which is an image src URL (String),
* link, which is the URL string that links to the actual Google Book,
* rating (Number), if any,
* pageCount (Number), if given, and
* dateSaved, which defaults to the "Date.now" when the record is saved


