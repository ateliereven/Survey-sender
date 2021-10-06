//const express = require('express') - for older versions of node that don't support ES6
import express from "express";
const app = express(); //there can be several express apps in one project
app.get('/', (req, res) => {
res.send({hi: 'there'});
});//create a route handler an associate it with a certain route
const PORT = process.env.PORT || 5000 // setting up a dynamic port for horoku deployment. port number is given only seconds before deployment. otherwise use development port which is 5000
app.listen(PORT); //express telling node to watch for incoming traffic on port 5000