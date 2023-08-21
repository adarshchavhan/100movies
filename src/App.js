import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Error from "./components/Error";

const lightTheme = {
  bgColor: "#fafafa",
  raiedColor: "#fff",
  textColor: "#444",
  shadowColor: "#e0e0e0",
  border: "1px solid #e7e7e7",
  transition: ".2s ease-in-out",
};

const darkTheme = {
  bgColor: "#0f0f0f",
  raiedColor: "#2F2F2F",
  textColor: "#e0e0e0",
  shadowColor: "rgba(255,255,255,.15)",
  border: "1px solid #555",
  transition: ".2s ease-in-out",
};

export default function App() {
  const [theme, setTheme] = useState(true);

  function themeToggler() {
    if (theme === true) {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }
  useEffect(() => {}, [theme]);

  return (
    <ThemeProvider theme={theme === true ? lightTheme : darkTheme}>
      <GlobalStyle />

      <Routes>
        <Route index path="/" element={<Movies themeToggler={themeToggler} />} />
        <Route exact path="/movies/:id" element={<Movie />} />
        <Route path="*" element={<Error icon="iconoir:emoji-sad" msg="Page Not Found!" />} />
      </Routes>
    </ThemeProvider>
  );
}
