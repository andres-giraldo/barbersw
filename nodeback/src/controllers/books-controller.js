const Book = require("../models/books-model");

exports.getBook = function (request, response) {
    let search = {};
    if (request.query.bookId != null && request.query.bookId != '') {
        search = {_id: request.query.bookId};
    }
    Book.find(search, function (error, book) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(book);
        }
    });
};

exports.saveBook = function (request, response) {
    if (request.body.bookId != null && request.body.bookId != "") {
        /* Get existent book and update values */
        Book.findById(request.body.bookId, (error, existentBook) => {
            existentBook.bookTitle = request.body.bookTitle;
            existentBook.bookAuthor = request.body.bookAuthor;
            existentBook.bookPages = request.body.bookPages;
            existentBook.bookPrice = request.body.bookPrice;
            saveData(existentBook, response);
        });
    } else {
        /* Create a book */
        saveData(new Book({ bookTitle: request.body.bookTitle, bookAuthor: request.body.bookAuthor, bookPages: request.body.bookPages, bookPrice: request.body.bookPrice }), response);
    }
};

function saveData(book, response) {
    book.save(function (error) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(book);
        }
    });
}

exports.deleteBook = function (request, response) {
    console.log(request);
    if (request.query.bookId != null && request.query.bookId != "") {
        Book.remove({ _id: request.query.bookId }, function (error, book) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.status(200).json(book);
            }
        });
    } else {
        response.status(400).send({ "errors": "Debe definir el id del libro que se va a borrar" });
    }
};