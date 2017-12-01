const mongoose = require("mongoose");
const Schema = mongoose.Schema;

reservationSchema = new Schema({
    name: { type: String, required: "El campo Nombre es obligatorio" },
    phone: { type: String, required: "El campo Telefono es obligatorio" },
    reservationDate: { type: String, required: "El campo Fecha es obligatorio" },
    reservationTime: { type: String, required: "El campo Hora es obligatorio" },

    cutDescription: { type: String, required: "El campo Corte es obligatorio" },
    cutImage: { type: String },
});

module.exports = mongoose.model('reservation', reservationSchema);