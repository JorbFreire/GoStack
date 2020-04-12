const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = []

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  if(!title || !url || !techs)
    return response.status.json({
      error: "you must to specify the following params on json body:",
      title: "",
      url:   "",
      techs: "",
    });
  
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepository);
  
  return response.status(200).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if(!id)
    return response.status(400).json({
      error: "you must especify the id o the repository to edit"
    });

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(!title && !url && !techs)
    return response.status(400).json({
      error: "you must to send unless one element on body request (title, url or techs)"
    });
  
  if(repositoryIndex < 0)
    return response.status(403).json({ error: "Repository not found" });
    
  if(title)
    repositories[repositoryIndex].title = title;
  if(url)
    repositories[repositoryIndex].url   = url;
  if(techs)
    repositories[repositoryIndex].techs = techs;
    
  return response.status(200).json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if(!id)
    return response.status(400).json({
      error: "you must especify the id o the repository to delete"
    });

  repositories.splice(
    repositories.findIndex(repository => repository.id === id), 1
  );
  
  return response.status(200).json( { status: "repository deleted" });
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if(!id)
    return response.status(400).json({
      error: "you must especify the id o the repository to add likes"
    });
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
    return response.status(403).json({ error: "repository not found" });
  
  repositories[repositoryIndex].likes++;
  
  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
