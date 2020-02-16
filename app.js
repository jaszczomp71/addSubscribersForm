//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/0008ebc367",
    method: "POST",
    headers: {
      "Authorization": "mj1 55b7bff8dc47b085569e3a1adfc1e5a2-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server jest na porcie 3000");
});




// API
// 55b7bff8dc47b085569e3a1adfc1e5a2-us4
// listID
// 0008ebc367.
