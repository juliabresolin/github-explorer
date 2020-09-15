import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: #a8a8b3;
      transition: color 0.3s;
      margin-right: 16px;

      &:hover {
        color: #666;
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const RepositoryInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 8px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 8px;
        color: #737380;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s;

    &:hover {
      transform: translateX(8px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const SkeletonLoaderContainer = styled.div`
  margin-top: 80px;

  * {
    margin-bottom: 16px;
  }
`;
