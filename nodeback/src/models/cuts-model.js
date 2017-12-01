const mongoose = require("mongoose");
const Schema = mongoose.Schema;

cutSchema = new Schema({
    cutNombre: { type: String, required: "El campo Nombre es obligatorio" },
    cutDescription: { type: String, required: "El campo Descripcion es obligatorio" },
    cutImage: { type: String, required: "Debe seleccionar una imagen para el corte" }
});

module.exports = mongoose.model('cut', cutSchema);