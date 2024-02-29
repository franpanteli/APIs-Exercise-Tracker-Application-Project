const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// In-memory storage for users and exercises
let users = [];
let exercises = [];

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

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

const PORT = process.env.PORT || 3000;

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
