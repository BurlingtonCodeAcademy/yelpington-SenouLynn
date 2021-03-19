//Import express library
const express = require("express");
var fs = require("fs");

//Process.env lets DNS handle porting, OR ( || ) port 5000 if we want to use app locally
const port = process.env.PORT || 5000;

//Initialize starting variables
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));

//Define Path
const path = require("path");

//Get information from API Folder  list.json
app.get("/api", (req, res) => {
  console.log("We are in api ");
  res.sendFile(path.resolve("./api/list.json"));
});

//Get info from directory.json
app.get("/api/directory", (req, res) => {
  res.sendFile(path.resolve("./api/directory.json"));
});

//Restaurant json info route
app.get("/api/:place", (req, res) => {
  let place = req.params.place;
  res.sendFile(path.resolve(`./api/${place}.json`));
});

//Starts server, keeps channel open to send and receive request
app.listen(port, () => {
  console.log(`Yelpington port running on: `, port);
});

//GOAL: FORM MAKES YOU PICK WHICH RESTO TO ADD REVIEW, STORING ID
//TAKE FORM ID => FIND CORRECT JSON FILE => PARSE => APPEND/PUSH REVIEW TO REVIEW KEY

app.post("/submit-review", async (req, res) => {
  let reviewId = req.body.pickResto;
  let reviewContent = req.body.review;

  console.log("REF: req.body", reviewId);
  console.log("REF: req.value", reviewContent);

  addReview(reviewId, reviewContent);
  res.redirect("/")
});

//Bring in info from review submit form
function addReview(reviewId, reviewContent) {
  //Grabbing exact file path of json file I want to update
  dataFile = path.resolve(`./api/${reviewId}.json`);

  console.log("REF: dataFile", dataFile);
  let fileInfo;
  //Reading the file's json info
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("Error reading file from disk");
    } else {
      fileInfo = JSON.parse(data);
      console.log("REF: fileInfo: ", fileInfo);

      console.log("REF: fileInfo.reviews: ", fileInfo.reviews);

      fileInfo.reviews.push(reviewContent);
    }

    //Write file back to the system
    fs.writeFile(dataFile, JSON.stringify(fileInfo), (err) => {
      if (err) {
        console.log("Error writing file back into mine systemzy: ", err);
      }
    });
  });
  
}

// Catchall to send back to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});
