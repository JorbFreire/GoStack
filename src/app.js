const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    id: "uuid",
    title: 'Desafio Node.js',
    url: 'http://github.com/...',
    techs: ["Node.js", "..."],
    likes: 0
  }
];

app.get("/repositories", (request, response) => {
  return repositories;
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  

  repositories.push({
    id: (repositories.length + 1),
    title,
    url,
    techs,
    likes: 0,
  });

  return 0;
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
