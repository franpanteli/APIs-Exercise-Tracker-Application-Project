/*
	Defining constants for the project <- 1/6:
		-> The `require` function is used to import modules into JavaScript
		-> We are importing the `express` module, and setting it equal to the `express` constant 
		-> The application we create will be an instance of the express module, stored in this variable 
		-> We are doing this to set a Node.js and Express.js framework for the application 

	Defining constants for the project <- 2/6:
		-> The second constant in this section imports the `cors` module, using the same `require` function as our previous import
		-> We later use the functions which this module contains, to create secure middleware for handling API requests 
		-> This module restricts the number of different webpages which can make requests to the server, for security reasons 

	Defining constants for the project <- 3/6:
		-> The third variable in this section imports the `body-parser` module
		-> This import is done with the same `require` function as our previous variable  
		-> The functions which this module contains are for `body-parser` middleware
		-> This allows the application to parse request objects from the client that have a JSON (JavaScript) object syntax
		-> This happens prior to handler execution 

	Defining constants for the project <- 4/6:
		-> The 4th constant (variable) we define in this block of code is `app`
		-> This is the name of the variable which stores the instance of the `express` project application 
		-> This initialises the application, so we can implement the methods and functions in the Express.js framework 

	Defining constants for the project <- 5/6:
		-> The 5th variable which we define in this block of code is `users`
		-> This initialises an empty array, for the application to store user information in
		-> This is part of the application's use of memory 
		-> An external MongoDB database could also be used to achieve this

	Defining constants for the project <- 6/6:
		-> The final variable that this block of code defines is a second empty array 
		-> This initialises a further array, to store information about the user's exercise which is entered into the application
		-> This is similar to the previous variable which was initialised 
	
	-> This section of code imported the modules which we later use to create middleware for the application 
	-> This also initialised arrays which we will use to store its data, and created an instance of the express application for this
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
let users = [];
let exercises = [];

/*
	-> `app` is the variable which stores the instance of the express application for the project
	-> The .use method is implemented three times in this block 
	-> This sets middleware for the application, using the Express.js framework 

	The three uses of the .use method throughout this block:
		The first use of the .use method <- `cors` middleware for security: 
			-> This use adds Cors middleware into the application 
			-> This middleware is for security (CORS is Cross-Origin Resource Sharing)
			-> This limits which webpages can make requests to the server 

		The second use of the .use method <- middleware so the server can send the client static files (e.g the project HTML file):
			-> The middleware which we are using here is for static file serving 
			-> The argument of this function is the directory on the server where the static assets it's sending the client are
			-> The static assets in this case are the project HTML and CSS files, and others
			-> These are hosted (stored) on the server - in the `public` directory - which we later configure it to send to the client 
        when they make requests 

		The third use of the .use method <- so the server can parse request bodies sent to it by the client:
			-> The middleware which this uses is from the `body-parser` module 
			-> This parses incoming request objects from the client 
			-> This takes those request objects and puts the body portion of them into the `req.body` object, which we use later for 
        defining the server route handlers <- how the server responds when it receives these requests 
			-> The argument of this (extended: false) means that we want parsed URL data, for example, to take the syntax of a string or an 
        array 
*/

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

/*
	This use of the .get method for the project:
		-> This block of code sets up a route handler for the server
		-> When an HTTP GET request is submitted to the server by the client, and this request is made to the root path on the server 
		-> We have the client and the server
		-> The client can make requests to the server
		-> One example of this is an HTTP GET request
		-> When this is made to the server, the code which tells it how to respond is a route handler, like the one defined here
		-> This uses the .get method: 
			-> The first argument to this is the path on the server which receives the HTTP GET request
			-> The second argument to this is the function which is executed when the call is made to this path - this is the callback 
				function 
			-> The syntax of this is an arrow function, and its contents are defined inside the code embedded in the use of the .get method 
				here 
		-> We are telling the server how to respond when the client accesses the main port that it's listening to 
			-> The .get method is otherwise normally used when the server is trying to retrieve (get) information to send back to the client 
			-> The information we are sending back here is the index.html file for the project -> this is an example where a static file is 
				served
			-> We do this using the .sendFile method in the callback function 
			-> `res.` is the response object <- this is the object which the server sends back to the client 
			-> The argument to this function is the path of the file on the server which we want to send back to the client (not the path to 
				which the HTTP GET request was originally made)
			-> The variable `__dirname` is a global variable in Node.js and represents the current directory 
		-> This block of code is a route handler for HHP GET requests to the server 
*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});










// Create a new user
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const newUser = { _id: users.length + 1, username };
  users.push(newUser);
  res.json(newUser);
});

// Add exercises to a user
app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  const newExercise = { userId: _id, description, duration, date };
  exercises.push(newExercise);
  res.json(newExercise);
});














// Get user's exercise log
app.get('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  let filteredExercises = exercises.filter(exercise => exercise.userId === _id);

  if (from) {
    filteredExercises = filteredExercises.filter(exercise => exercise.date >= from);
  }

  if (to) {
    filteredExercises = filteredExercises.filter(exercise => exercise.date <= to);
  }

  if (limit) {
    filteredExercises = filteredExercises.slice(0, limit);
  }

  const user = users.find(user => user._id === _id);
  const log = filteredExercises.map(exercise => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
  }));
  const count = filteredExercises.length;

  res.json({
    _id,
    username: user.username,
    count,
    log,
  });
});

























const PORT = process.env.PORT || 8080;
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
