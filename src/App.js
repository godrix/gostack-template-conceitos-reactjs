import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await api.get('repositories');
        setRepositories(response.data);
      } catch (error) {
        alert('Não foi possivel carregar o conteudo');
      }
      
    })()
  },[]);

  async function handleAddRepository() {
    const arrayTitle = ['Desafio ReactJS', 'Desafio Nodejs','Desafio React Native'];
    const arrayTecs = ['ReactJS', 'Nodejs','ReactNative'];
    try {
      const response = await api.post('repositories', {
        url: `https://github.com/${arrayTecs[Math.floor(Math.random() * 3)]}`,
        title: arrayTitle[Math.floor(Math.random() * 3)],
        techs: [arrayTecs[Math.floor(Math.random() * 3)], arrayTecs[Math.floor(Math.random() * 3)]],
      });

      setRepositories([...repositories, response.data]);
      
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    } catch (error) {
      alert('Não foi possivel deletar')
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositorie=>(
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>))
        } 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
