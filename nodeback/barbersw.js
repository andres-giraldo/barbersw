const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const newRoutes = require('./src/routes/new-routes');
const cutsRoutes = require('./src/routes/cuts-routes');
const reservationsRoutes = require('./src/routes/reservations-routes');

mongoose.connect("mongodb://localhost/barbersw", {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
});

mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: true
}));
app.use(morgan('dev'));
app.use(cors());

let apiRoutes = express.Router();
apiRoutes.use(function (request, response, next) {
    next();
});
app.use(apiRoutes);

//newRoutes(app);
cutsRoutes(app);
reservationsRoutes(app);
app.listen(1050);