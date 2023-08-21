import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "./Context";
import Error from "./Error";
import Loader from "./Loader";

export default function Movies({ themeToggler }) {
  const { movies, query, setQuery, isError, loading } = useGlobalContext();

  document.title = "100Movies";
  return (
    <>
      <Nav>
        <NavLink to="/" className="logo">
          <iconify-icon className="icon" icon="cil:movie"></iconify-icon>{" "}
          100movies
        </NavLink>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="serach-bar"
        />
        <button onClick={() => themeToggler()}>
          <iconify-icon icon="fluent:dark-theme-24-regular"></iconify-icon>
        </button>
      </Nav>
      {!isError.show && (
        <SMovies>
          {movies.map((e) => {
            return (
              <NavLink
                className="link"
                key={e.imdbID}
                to={`/movies/${e.imdbID}`}
              >
                <div className="movie">
                  <h3>
                    {e.Title.length <= 28 && e.Title}
                    {e.Title.length > 28 && `${e.Title.slice(0, 28)}...`}
                  </h3>
                  <img src={e.Poster} alt="" />
                </div>
              </NavLink>
            );
          })}
        </SMovies>
      )}

      {isError.show && <Error icon="cil:sad" msg="Something Wents Wrong!" />}
      {loading && <Loader />}
    </>
  );
}

const Nav = styled.nav`
  width: 100%;
  height: 120px;
  padding-left: 20px;
  background: ${({ theme }) => theme.raisedColor};
  box-shadow: 0px 0px 10px ${({ theme }) => theme.shadowColor};
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    color: royalblue;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  input[type="text"] {
    width: 350px;
    padding: 10px 15px;
    margin: auto;
    color: ${({ theme }) => theme.textColor};
    font-size: 16px;
    border-radius: 20px;
    border: ${({ theme }) => theme.border};
    outline: 0;
    background: transparent;
    position: relative;
    left: -10px;
    &:hover,
    &:focus {
      box-shadow: 0px 0px 10px ${({ theme }) => theme.shadowColor};
    }
  }
  button {
    font-size: 20px;
    color: ${({ theme }) => theme.textColor};
    background: transparent;
    border: 0;
    outline: 0;
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    max-width: 100vw;
    overflow: hidden;
    height: 150px;
    flex-direction: column;
    .logo {
      position: absolute;
      left: 25px;
      top: 25px;
    }
    button {
      position: absolute;
      right: 5px;
      top: 0px;
    }
    input {
      max-width: calc(100% - 20px);
      bottom: -25px;
    }
  }
`;

const SMovies = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 20px 0;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  justify-items: center;
  .link {
    width: 100%;
    text-decoration: none;
  }
  .movie {
    padding: 10px;
    height: 100%;
    margin: auto;
    background: ${({ theme }) => theme.raisedColor};
    border: ${({ theme }) => theme.border};
    border-radius: 10px;
    box-shadow: 0px 2px 20px ${({ theme }) => theme.shadowColor};
    text-align: center;
    position: relative;
    transition: ${({ theme }) => theme.transition};
    text-decoration: none;
    top: 0;
    h3 {
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.textColor};
    }
    img {
      width: 80%;
      border-radius: 10px;
      position: relative;
      top: 0;
      transform: scale(0.95);
      filter: grayscale(0.2);
      transition: ${({ theme }) => theme.transition};
    }
    &:hover {
      box-shadow: 0px 20px 20px ${({ theme }) => theme.shadowColor};
      top: -10px;
      img {
        top: 10px;
        box-shadow: 0px 0px 40px ${({ theme }) => theme.shadowColor};
      }
    }
  }

  @media (max-width: 1200px) {
    max-width: 900px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 992px) {
    max-width: 700px;
  }
  @media (max-width: 768px) {
    max-width: 500px;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    width: 80%;
    max-width: 500px;
    grid-template-columns: 1fr;
    padding: 30px 0;
    gap: 30px;
  }
`;
