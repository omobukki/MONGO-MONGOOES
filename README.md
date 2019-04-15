# MONGO-MONGOOESOverview
In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.
Before You Begin
Create a GitHub repo for this assignment and clone it to your computer. Any name will do -- just make sure it's related to this project in some fashion.
Run npm init. When that's finished, install and save these npm packages:
express
express-handlebars
mongoose
cheerio
axios
NOTE: If you want to earn complete credit for your work, you must use all five of these packages in your assignment.
In order to deploy your project to Heroku, you must set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running:
Create a Heroku app in your project directory.
Run this command in your Terminal/Bash window:
heroku addons:create mongolab
This command will add the free mLab provision to your project.
When you go to connect your mongo database to mongoose, do so the following way:
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
This code should connect mongoose to your remote mongolab database if deployed, but otherwise will connect to the local mongoHeadlines database on your computer.