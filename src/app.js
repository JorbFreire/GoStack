const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

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
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  
  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(!title && !url && !techs)
    return response.status(400).json({ error: "empty body" });
  
  if(repositoryIndex <= 0)
    return repositoryIndex.status(403).json({ error: "Repository not found" });
    
  if(title)
    repositories[repositoryIndex].title = title;
  if(url)
    repositories[repositoryIndex].url = url;
  if(techs)
    repositories[repositoryIndex].techs = techs;
    
  return repositories[repositoryIndex];
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
