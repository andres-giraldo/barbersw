const mongoose = require("mongoose");
const Schema = mongoose.Schema;

bookSchema = new Schema({
    bookTitle: { type: String, required: "El campo Título es obligatorio" },
    bookAuthor: { type: String, required: "El campo Autor es obligatorio" },
    bookPages: { type: Number, required: "El campo Páginas es obligatorio", min: [1, "El campo Páginas no puede tener un valor inferior a 1"], max: [1000, "El campo Páginas no puede tener un valor mayor a 1000"] },
    bookPrice: { type: Number, min: [0, "El campo Precio no puede tener un valor inferior a 0"], max: [100000, "El campo Precio no puede tener un valor mayor a 100000"] }
});

module.exports = mongoose.model('book', bookSchema);