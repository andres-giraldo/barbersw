const mongoose = require("mongoose");
const Schema = mongoose.Schema;

reservationSchema = new Schema({
    name: { type: String, required: "El campo Nombre es obligatorio" },
    phone: { type: String, required: "El campo Telefono es obligatorio" },
    reservationDate: { type: String, required: "El campo Fecha es obligatorio" },
    reservationTime: { type: String, required: "El campo Hora es obligatorio" },
});

module.exports = mongoose.model('reservation', reservationSchema);