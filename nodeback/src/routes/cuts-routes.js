module.exports = function (app) {
    let cutsController = require('../controllers/cuts-controller');

    app.route("/cuts")
        .get(cutsController.getCut)
        .post(cutsController.saveCut)
        .delete(cutsController.deleteCut);
};