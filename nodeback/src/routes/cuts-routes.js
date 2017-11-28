module.exports = function (app) {
    let cutsController = require('../controllers/cuts-controller');

    app.route("/cuts")
        .get(cutsController.getBook)
        .post(cutsController.saveBook)
        .delete(cutsController.deleteBook);
};