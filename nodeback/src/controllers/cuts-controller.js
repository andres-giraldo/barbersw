const Cut = require("../models/cuts-model");

exports.getCut = function (request, response) {
    let search = {};
    if (request.query.cutId != null && request.query.cutId != '') {
        search = { _id: request.query.cutId };
    }
    Cut.find(search, function (error, cut) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).json(cut);
        }
    });
};

exports.saveCut = function (request, response) {
    let imageCut = null;
    if (request.body.cutImage != null) {
        imageCut = request.body.cutImage.base64;
    }
    
    let fs = require('fs');

    if (request.body.cutId != null && request.body.cutId != "") {
        /* Get existent cut and update values */
        Cut.findById(request.body.cutId, (error, existentCut) => {
            existentCut.cutNombre = request.body.cutNombre;
            existentCut.cutDescription = request.body.cutDescription;
            saveData(existentCut, response);
            if (imageCut != null) {
                fs.writeFile("../angularfront/images/" + existentCut.cutImage, imageCut, 'base64', function (err) {
                    console.log(err);
                });
            }
        });
    } else {
        /* Create a cut */
        var random = Math.random();
        saveData(new Cut({ cutNombre: request.body.cutNombre, cutDescription: request.body.cutDescription, cutImage: imageCut != null ? (random + ".png") : undefined }), response);
        fs.writeFile("../angularfront/images/" + random + ".png", imageCut, 'base64', function (err) {
            console.log(err);
        });
    }
};

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

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