module.exports = function (app) {
    let reservationsController = require('../controllers/reservations-controller');

    app.route("/reservations")
        .get(reservationsController.getReservation)
        .post(reservationsController.saveReservation)
        .delete(reservationsController.deleteReservation);
};