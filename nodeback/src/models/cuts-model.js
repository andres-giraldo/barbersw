const mongoose = require("mongoose");
const Schema = mongoose.Schema;

cutSchema = new Schema({
    cutNombre: { type: String, required: "El campo Nombre es obligatorio" },
    cutDescription: { type: String, required: "El campo Descripcion es obligatorio" },
    cutTime: { type: String, required: "El campo Tiempo es obligatorio" },
    cutImage: { type: String }
});

module.exports = mongoose.model('cut', cutSchema);