"use strict";

var express = require('express');

var path = require('path');

var app = express(); // //CONDITIONS IF DEPLOYED TO PRODUCTION
// if (process.env.HTTP_PORT) {
//   // Express will serve up production assets
//   // like our main.js file, or main.css file!
//   app.use(express.static(path.join(__dirname, 'client', 'build')));
//   // Express will serve up the index.html file
//   // if it doesn't recognize the route
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.use(express["static"](path.join(__dirname, 'client', 'build'))); //ROUTES

app.get('/api/theworld', function (req, res) {
  res.json({
    answer: 'worlds'
  });
}); //SERVER RUNNING

var port = process.env.HTTP_PORT || 2000;
app.listen(port, function () {
  console.log("Running on http://localhost:".concat(port));
});
