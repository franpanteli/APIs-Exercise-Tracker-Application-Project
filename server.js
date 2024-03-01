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

/*
	The idea behind these two HTTP POST request handlers:
		-> It's an HTTP POST request to this endpoint (argument), and this is the arrow (callback) function the server executes 
		-> We define this callback function inside the block
		-> The first block instructs the HTTP POST request handler to add the client to the database, and the second HTTP POST request handler 
			logs exercises 
		-> Either the client enters a new user or an exercise to be logged
		-> In both cases, we define route handlers for these HTTP POST requests 
		-> These take the contents of the request object, stored in `req.body` <- this uses `body-parser` middleware 
		-> They then format the contents of this, into a response (`res`) object
		-> This object follows the syntax of a JSON (JavaScript) object
		-> This object is then pushed back to the client and logged into the local server memory 

	The first HTTP POST request handler in this block <- the client logs a new user:
		-> The client makes an HTTP POST request to the server's API endpoint
		-> The endpoint to which this is made is the first argument of its request handler 
		-> The second argument is its callback function, to be executed when the request reaches the server
			-> This has two arguments: the request (`req`) object which is sent from the client to the server, and the response (`res`) object 
				which is sent from the server to the client 

		Two constants are defined as part of this:
			-> This is the HTTP POST request handler for the case that the client submits a new user, rather than a new exercise
			-> The request object contains this information which the client entered about the user, to be added to the memory in our application 
			-> This user information is stored in the request body 
			-> This HTTP POST request handler instructs the server what to do with this information when it is received 
			-> The first variable which its callback function defines takes the value of the user information which the client entered into the 
				request body 
			-> The second variable (`newUser`) takes the syntax of the JSON (JavaScript) object which we want the application to return to the 
				client, once the new user has been entered 
				-> In this instance of the `app`, we have a memory of all of the users which have been entered into that database
				-> The second element in the variable which we define in this block of code contains the index of this user
				-> The index of the user which we are currently entering into the database is the same as the index of the last user which was 
					entered, plus one
				-> The second element of this variable stores the user name which the client entered into the request body 

		Returning the response object to the client in the correct syntax:
			-> The final two lines of code in this HTTP POST request return the contents of the `newUser` variable to the client 
			-> The first line logs the contents of that user to the memory array which we previously initialised for the users, using the .push 
				method 
			-> The final line of this POST request sends the contents of the `newUser` variable back to the client, in the syntax of a JSON 
				(JavaScript) response object 
	
		-> This first HTTP POST request handler was for adding in a new user
		-> The first argument in that route handler is the API endpoint on the server, to which the request was made 
		-> The request body has a JSON object which stores the username 
		-> Then we give that user an ID based on the number of users already stored in the server memory
		-> We then add this user to the server memory in an array and send a JSON object back to the client  

	The second HTTP POST request handler in this block <- what the server does if the client logs a new exercise:
		What the second route handler in this block of code does:
			-> This HTTP POST request handler is so the user can log new exercises
			-> The first argument is the API endpoint on the server to which this request is made
			-> The second argument is the callback function, what the server does when it receives one of these requests to this endpoint 
			-> The request body sent to the server for logging exercises contains a lot more information than the one for logging a new user
			-> All of the constants which we define are extracting the user information from the request body and formatting them into the syntax
				of a JSON (JavaScript) object to return back 
			-> As with the first method, except here we have a lot more information 
			-> The penultimate line in this section takes this object, stored in `newExercise`, and adds it to the array which stores the 
				previously logged exercises
			-> The final line returns this object to the client as a response object 

		In more technical terms: 
			-> The path on the server which is the first argument to the function is called the endpoint 
			-> The request body must take JSON syntax for this to work 
			-> `newExercise` is a new instance of an exercise object 	
			-> All of the entries are stored on the server in an array 
*/

// To log a new user
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const newUser = { _id: users.length + 1, username };
  users.push(newUser);
  res.json(newUser);
});

// To log new exercises
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

/*
	Telling the application to listen to a port:
		-> `app` is the name of the variable which stores this instance of the Express application
		-> This project is intended to be run locally
		-> This block of code uses the .listen method
		-> This tells the server which port to listen to
		-> This port number is set in the variable before the .listen method is used  

		The arguments of this are:
			The port number that the application will use: 
				-> The value of this is stored in the `port` variable
				-> The value of this is set at the beginning in this block of code
				-> Since this port number is sensitive information, this file imports its value from an external .env (environment) file 
				-> If this file is non-existent, then we use pipe symbols (`||`) to set its value to 8080  

			The callback function which we want to execute when the server starts listening to the port: 
				-> We use the .log method here, to write a message in the terminal
				-> This includes the value of the `PORT` variable, which the server listens to

	There are two stages when the client connects to the server: 
		-> The client makes requests to the port, by accessing its associated URL  
		-> The server can access that same port, by 'listening' to it 
		-> When the client makes a request to the port via accessing its URL, a request object is sent to the server
		-> The server then implements route handling and sends back an appropriate response object to the client, via the port 

		For this exchange to happen:
			-> The server must listen to the port <- this is what this section of code does, and we will know that the server is listening 
				to the port once the console logs the message which is set here 
			-> The client must access the port via a URL 
			-> That URL is specific to the port 	
			-> The client must make a request -> in this case, by accessing the microservice at that URL 
			-> The server must have the correct middleware, depending on the contents of the request object 

	-> We are telling the server to listen for connections made to that port 
	-> We are also defining the port number which sets the URL the client accesses the application from 
*/

const PORT = process.env.PORT || 8080;
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
