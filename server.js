/**
 * Created by karina on 26/02/17.
 */
"use strict";
var express = require('express');
var app = express();
app.listen(8080);
app.use(express.static('public'));
app.use(express.static('node_modules'));