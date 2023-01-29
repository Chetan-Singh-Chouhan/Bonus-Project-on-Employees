const express = require('express');
const route = require('./routes/route.js');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Chetan-functionUp:9EFNNLl4q6IIvejN@cluster0.evsfgyx.mongodb.net/group13Database", { useNewUrlParser: true })
    .then(() => console.log("Mongo db is connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen(3000, function () {
    console.log('Express app running on port ' + 3000)
});
