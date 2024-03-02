# APIs-Exercise-Tracker-Fullstack-Project

This repository contains my independent problem-solving work, used to produce a full-stack JavaScript application with Node.js and Express.js. This application allows users to track their exercises and view logs for this. This was my [fourth project](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker) in freeCodeCamp's Back End Development and APIs curriculum. *The problem-solving approach I used to create this is in its [server.js file](https://github.com/franpanteli/APIs-Exercise-Tracker-Fullstack-Project/blob/main/server.js).* This project builds on the [first](https://github.com/franpanteli/APIs-Timestamp-Microservice-Project), [second](https://github.com/franpanteli/APIs-Request-Header-Parser-Microservice-Project) and [third](https://github.com/franpanteli/APIs-URL-Shortener-Microservice-Project) problems I solved as part of [this course](https://www.freecodecamp.org/learn/back-end-development-and-apis/#mongodb-and-mongoose). This project defined HTTP POST request handlers to add users and their exercises. HTTP GET request handling was implemented to enable clients to retrieve these exercise logs. This retrieval filters these logs within a specified date range, result limit or for a specific user ID in the server memory. Static file serving provided the HTML file for this, and the project dependencies are detailed below.

## Application Installation & Usage
<img width="984" alt="Screenshot 2024-03-02 at 13 52 22" src="https://github.com/franpanteli/APIs-Exercise-Tracker-Fullstack-Project/assets/131474705/31684d81-ed55-429d-89b0-c4f4394819d7">

[My full notes on how to run the application locally are here](https://github.com/franpanteli/APIs-Exercise-Tracker-Fullstack-Project/blob/main/launching-the-app-locally.txt). First, clone this repository with `git clone https://github.com/franpanteli/APIs-Exercise-Tracker-Fullstack-Project.git`.

## Dependencies

This project has two dependencies. The first is [express](https://www.npmjs.com/package/express), which was used to build the web application in its [server.js file](https://github.com/franpanteli/APIs-Request-Header-Parser-Microservice-Project/blob/main/server.js). The second dependency is [Cors](https://www.npmjs.com/package/cors), whose middleware was used for security purposes.
