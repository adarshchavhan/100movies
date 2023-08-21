import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Error from "./Error";
import Loader from "./Loader";

export default function Movie() {
  const { id } = useParams();
  const { apiKey } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "Loading..." });
  const [movie, setMovie] = useState("");

  useEffect(() => {
    async function getMovie() {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
      try {
        const req = await fetch(url);
        const data = await req.json();
        if (data.Response === "True") {
          document.title = `100Movies - ${data.Title}`;
          setLoading(false);
          setIsError({ show: false });
          setMovie(data);
        } else {
          setIsError({ show: true });
          setLoading(false);
        }
      } catch (error) {
        console.clear();
      }
    }
    getMovie(apiKey, id);
  }, [apiKey, id]);

  return (
    <>
      {!isError.show && (
        <SMovies>
          <NavLink className="back-btn" to="/">
            Back
          </NavLink>
          <div className="movie">
            <img src={movie.Poster} alt="" />
            <div className="text">
              <h3>{movie.Title}</h3>
              <p>{movie.Plot}</p>
              <ul>
                <li>
                  <p>
                    <b>Duration : </b>
                    {movie.Runtime}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Released at </b>
                    {movie.Released}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Genre : </b>
                    {movie.Genre}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Languages : </b>
                    {movie.Language}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Ratings : </b>10/{movie.imdbRating}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Actors : </b>
                    {movie.Actors}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Directed by: </b>
                    {movie.Director}
                  </p>
                </li>

                <li>
                  <p>
                    <b>Awards : </b>
                    {movie.Awards}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </SMovies>
      )}

      {isError.show && <Error icon="quill:usersad" msg="Movie Not Found!" />}

      {loading && <Loader />}
    </>
  );
}

const SMovies = styled.div`
  width: 100%;
  max-width: 1100px;
  min-height: 100vh;
  max-width: auto;
  padding: 20px 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .back-btn {
    padding: 10px 20px;
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    border: ${({ theme }) => theme.border};
    border-radius: 5px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  
  .movie {
    padding: 20px;
    height: auto;
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.raisedColor};
    border: ${({ theme }) => theme.border};
    border-radius: 10px;
    box-shadow: 0px 40px 80px ${({ theme }) => theme.shadowColor};
    position: relative;
    transition: ${({ theme }) => theme.transition};
    text-decoration: none;
    top: 0;
    display: flex;
    gap: 10px;
    font-family: "Poppins", sans-serif;
    h3 {
      padding: 10px 0;
      font-size: 24px;
      color: ${({ theme }) => theme.textColor};
      max-width: 500px;
      word-wrap: break-word;
    }
    p {
      max-width: 500px;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 25px;
      word-spacing: 5px;
      font-weight: 400;
    }
    ul {
      padding: 10px 20px;
      li {
        padding: 2px;
        list-style: none;
      }
    }
    img {
      max-width: 270px;
      margin: auto;
      border-radius: 10px;
      position: relative;
      top: 0;
      transform: scale(0.95);
      filter: grayscale(0.2);
      transition: ${({ theme }) => theme.transition};
      box-shadow: 0px 20px 20px ${({ theme }) => theme.shadowColor};
    }
    &:hover {
      box-shadow: 0px 20px 20px ${({ theme }) => theme.shadowColor};
      top: -10px;
      img {
        top: 10px;
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
    padding: 100px 0;
    .movie {
      flex-direction: column;
    }
  }
  @media (max-width: 576px) {
    max-width: 400px;
    padding: 100px 0;
    .movie {
      width: 80%;
      max-width: 500px;
      img {
        max-width: 220px;
      }
    }
  }
`;
