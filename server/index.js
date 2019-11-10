const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const playersRouter = require("./routes/players");

const port = process.env.PORT || 3001;


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Preventing DOS Attack
// limit the body payload using body-parser
app.use(express.json({ limit: '100kb'})) // Body limit is 100

// Preventing DOS Attack
// limit number of request per user
// dependency: express-rate-limit
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour locked after get maximum amount of requests
    message: 'Too many requests' // message to send
});
app.use("/players", limit);
app.use("/players", playersRouter);
app.listen(port, function() {
    console.log("Runnning on " + port);
});
module.exports = app;