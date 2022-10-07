"use strict";
/**
 * Add your API server code here.
 *
 * See the README.md file at the root of this repository for instructions.
 */
const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(8080);
console.log("Hello World!");
