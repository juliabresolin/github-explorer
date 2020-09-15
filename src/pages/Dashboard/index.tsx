import React, { useState, FormEvent, useEffect } from 'react';

import { FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Title, Form, Repositories, Error, Header } from './styles';
import logoImage from '../../assets/images/logo.svg';

import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@githubexplorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@githubexplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Please, inform the owner/repository name!');
      return;
    }

    try {
      const response = await api.get(`repos/${newRepo}`);

      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Error searching for repository!');
    }
  }

  function handleClearStorage() {
    localStorage.clear();
    setRepositories([]);
  }

  return (
    <>
      <Header>
        <img src={logoImage} alt="github explorer logo" />
        <button
          type="button"
          onClick={handleClearStorage}
          disabled={repositories.length === 0}
        >
          <FiTrash2 size={18} />
          Clear cache
        </button>
      </Header>
      <Title>Explore github repositories!</Title>

      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="owner/repository (example: facebook/react-native)"
        />
        <button type="submit">Search Repository</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={24} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
