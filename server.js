var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
if ( process.env.MONGODB_URI){

  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
}else{
  
  mongoose.connect("mongodb://localhost/scrapper", { useNewUrlParser: true })
}

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // Make request via axios to grab the HTML from `awwards's` clean website section
  var url = "https://m.chron.com";
  axios.get(url).then(function(response) {

    // Load the HTML into cheerio
    var $ = cheerio.load(response.data);


    // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
    $("h4 a.hdn-analytics").each(function(i, element) {
      // Save the text of the element in a "title" variable
      var title = $(element).text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      var link = url + $(element).attr("href");
      
      //create object to send to DB
      var result = {
        title: title,
        summary: "Text",
        url: link
      }

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/", function(req, res) {
  res.send("index.html")
})


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});