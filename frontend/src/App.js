import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  async function handleAddRepository(event) {
    event.preventDefault();
    const response = await api.post('/repositories', {
      title,
      url,
      techs
    });
    console.log(response);
    if(response.status === 200)
      setRepositories([...repositories, response.data]);

    return 0;
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoriesFilter = repositories.filter(repository => {
      return repository.id !== id
    });
    setRepositories([...repositoriesFilter]);
  }

  useEffect(() => {
    const getRepositories = async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data);
      return 0;
    }
    getRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (
          <li key={repository.id}>
            <a href={repository.url}>
              <h1> {repository.title} </h1>
              <p> {repository.techs} </p>
              
            </a>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Url do repositorio"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Techs"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
