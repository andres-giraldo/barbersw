const Cut = require("../models/cuts-model");

exports.getCut = function (request, response) {
    let search = {};
    if (request.query.bookId != null && request.query.cutId != '') {
        search = {_id: request.query.cutId};
    }
    Cut.find(search, function (error, cut) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(cut);
        }
    });
};

exports.saveCut= function (request, response) {
    if (request.body.cutId != null && request.body.cutId != "") {
        /* Get existent book and update values */
        Cut.findById(request.body.cutId, (error, existentCut) => {
            existentCut.cutDescription = request.body.cutDescription;
            existentCut.cutTime = request.body.cutTime;
            existentCut.cutImage = request.body.cutImage;
            saveData(existentCut, response);
        });
    } else {
        
        /* Create a book */
        saveData(new Cut({ cutDescription: request.body.cutDescription, cutTime: request.body.cutTime, cutImage: request.body.cutImage}), response);
    }
};

function saveData(cut, response) {
    cut.save(function (error) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(cut);
        }
    });
}

exports.deleteCut = function (request, response) {
    console.log(request);
    if (request.query.cutId != null && request.query.cutId != "") {
        Cut.remove({ _id: request.query.cutId }, function (error, cut) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.status(200).json(cut);
            }
        });
    } else {
        response.status(400).send({ "errors": "Debe definir el id del libro que se va a borrar" });
    }
};