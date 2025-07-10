const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, name: "Przykładowe zadanie", time: 0, isRunning: false, isDone: false, isRemoved: false }
];

// GET all tasks
app.get('/tasks', (req, res) => res.json(tasks));

// POST new task
app.post('/tasks', (req, res) => {
  const newTask = { ...req.body, id: Date.now() };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.map(t => t.id === id ? { ...req.body, id } : t);
  res.json(tasks.find(t => t.id === id));
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));