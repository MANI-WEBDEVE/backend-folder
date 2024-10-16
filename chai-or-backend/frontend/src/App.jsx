import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>How to Fetch Hand Make API</h1>
      <p>jokes: {jokes.length}</p>
      {jokes.map((joke, index) => (
        <div key={joke.id}>
          <h2>{joke.Name}</h2>
          <img src={joke.img} alt="" />
          <p>{joke.joke}</p>
        </div>
      ))}
    </>
  );
}

export default App;
