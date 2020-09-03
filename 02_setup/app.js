const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // parse json body

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

app.listen(3000); // listen at port 3000. You can use different port
