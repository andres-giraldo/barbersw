module.exports = function (app) {
    let booksController = require('../controllers/books-controller');

    app.route("/books")
        .get(booksController.getBook)
        .post(booksController.saveBook)
        .delete(booksController.deleteBook);
};