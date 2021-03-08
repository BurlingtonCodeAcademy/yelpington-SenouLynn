//Import express library
const express = require("express");
var fs = require('fs')

//Process.env lets DNS handle porting, OR ( || ) port 5000 if we want to use app locally
const port = process.env.PORT || 5000;

//Initialize starting variables
const app = express();

//Define Path
const path = require('path')


//Get information from API Folder  list.json
app.get('/api', (req, res) => {
  console.log("We are in api ")
    res.sendFile(path.resolve('./api/list.json'))
})

//Get info from directory.json
app.get('/api/directory', (req, res) => {
  res.sendFile(path.resolve('./api/directory.json'))
})


//Restaurant json info route
app.get('/api/:place', (req, res) =>{
    let place = req.params.place;
    res.sendFile(path.resolve(`./api/${place}.json`));
})

// Catchall to send back to index.html
app.get("*", (req, res) => {
    res.sendFile(path.resolve("./client/public/index.html"));
  });
  
//Starts server, keeps channel open to send and receive request
app.listen(port, () => {
    console.log(`Yelpington port running on: `, port);
  });
  
//GOAL: FORM MAKES YOU PICK WHICH RESTO TO ADD REVIEW, STORING ID
//TAKE FORM ID => FIND CORRECT JSON FILE => PARSE => APPEND/PUSH REVIEW TO REVIEW KEY

// app.post(
//   "/submit-review",
//   express.urlencoded({ extended: false }),
//   (request, response) => {
//     //REQUEST.VALUE IS A PLACEHOLDER
//     addReview(request.value, request.review, response);
//   }
// );

// function addReview(request.value, params, res){


// }