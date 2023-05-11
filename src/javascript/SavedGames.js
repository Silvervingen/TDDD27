import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { db } from "./firestore";
import "firebase/firestore";

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

function SavedGames() {
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const count = 1000;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&metacritic=50,100&ratings_count_min=1000&exclude_additions=true&rating_min=2.5&search=${searchInput}`;
    setGames([]); // reset games state to empty array, so its is possible to change order mulitple times
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      })
      .catch(error => console.error('Error:', error));
  }, [searchInput]);
  

  const addToSavedGames = (game) => {
    db.collection("savedGames").add(game)
      .then(() => {
        console.log("Game added to saved games");
      })
      .catch((error) => {
        console.error("Error adding game to saved games:", error);
      });
  };

  return (
    <div>
      <div className="Library-header">
        <h1>Lists</h1>
        <div id="searchbar2">
          <input id="searchbar" type="text" placeholder="Search.." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </div>
      </div>

      <div className="game-container"> {/* Use a container to hold each game */}
        {games.map((game) => (
          <div className="game-box">
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <button onClick={() => {addToSavedGames(game); setSearchInput("")}}>Add to saved games</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SavedGames;
