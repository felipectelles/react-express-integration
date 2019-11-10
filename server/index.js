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

// Preventing DOS Attacks
// limit the body payload using body-parser
app.use(express.json({ limit: '100kb'})) // Body limit is 100

// express feature -> express-rate-limit dependency
// npm install express-rate-limit --save
// setting maximum amount of requests
// after user uses all of his requests,
// lock him out for certain amount of time
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});
app.use("/players", limit);
app.use("/players", playersRouter);
app.listen(port, function() {
    console.log("Runnning on " + port);
});
module.exports = app;