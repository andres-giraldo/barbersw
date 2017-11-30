const Reservation = require("../models/reservations-model");

exports.getReservation = function (request, response) {
    let search = {};
    if (request.query.reservationId != null && request.query.reservationId != '') {
        search = {_id: request.query.reservationId};
    }
    Reservation.find(search, function (error, reservation) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(reservation);
        }
    });
};

exports.saveReservation = function (request, response) {
    if (request.body.reservationId != null && request.body.reservationId != "") {
        /* Get existent book and update values */
        Reservation.findById(request.body.reservationId, (error, existentReservation) => {
            existentReservation.name = request.body.name;
            existentReservation.phone = request.body.phone;
            existentReservation.reservationDate = request.body.reservationDate;
            existentReservation.reservationTime = request.body.reservationTime;
            saveData(existentReservation, response);
        });
    } else {
        /* Create a book */
        saveData(new Reservation({ name: request.body.name, phone: request.body.phone, reservationDate: request.body.reservationDate, reservationTime: request.body.reservationTime }), response);
    }
};

function saveData(reservation, response) {
    reservation.save(function (error) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(reservation);
        }
    });
}

exports.deleteReservation = function (request, response) {
    console.log(request);
    if (request.query.reservationId != null && request.query.reservationId != "") {
        Reservation.remove({ _id: request.query.reservationId }, function (error, reservation) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.status(200).json(reservation);
            }
        });
    } else {
        response.status(400).send({ "errors": "Debe definir el id de la reservación que se va a borrar" });
    }
};