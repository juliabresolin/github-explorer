import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SkeletonLoader from 'tiny-skeleton-loader-react';

import logoImage from '../../assets/images/logo.svg';
import {
  Header,
  RepositoryInfo,
  Issues,
  SkeletonLoaderContainer,
} from './styles';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  title: string;
  html_url: string;
  id: number;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logoImage} alt="github explorer logo" />
        <div>
          <Link to="/">
            <FiChevronLeft size={16} />
            Back to home
          </Link>
        </div>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      {issues.length > 0 ? (
        <Issues>
          {issues.map(issue => (
            <a target="blank" href={issue.html_url} key={issue.id}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={24} />
            </a>
          ))}
        </Issues>
      ) : (
          <SkeletonLoaderContainer>
            <SkeletonLoader width="100%" height="88px" background="#eaeaef" />
          </SkeletonLoaderContainer>
        )}
    </>
  );
};

export default Repository;
