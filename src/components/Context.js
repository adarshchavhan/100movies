import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "Loading..." });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("jobs");

  const apiKey = process.env.REACT_APP_MOVIE_KEY;

  async function getMovies({ apiKey, query }) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
    try {
      const req = await fetch(url);
      const data = await req.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setLoading(false);
        setIsError({ show: false });
      } else {
        setIsError({ show: true });
        setLoading(false);
      }
    } catch (error) {
      console.clear();
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getMovies({ apiKey, query });
    }, 500);

    return () => clearTimeout(timer);
  }, [apiKey, query]);

  return (
    <AppContext.Provider
      value={{ loading, isError, movies, query, setQuery, apiKey }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
