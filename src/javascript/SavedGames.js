import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { db, auth } from "./firestore";

import "firebase/firestore";

import "../css/SavedGames.css"; // Import CSS file

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

function SavedGames() {
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGames, setSavedGames] = useState([]);

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

  useEffect(() => {
    // get saved games from database for the current user
    const userId = auth.currentUser.uid;
    db.collection("savedGames")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        const savedGames = [];
        querySnapshot.forEach((doc) => {
          savedGames.push(doc.data());
        });
        setSavedGames(savedGames);
      })
      .catch((error) => {
        console.error("Error getting saved games:", error);
      });
  }, []);

  const addToSavedGames = (game) => {
    const userId = auth.currentUser.uid;
    const query = db.collection("savedGames").where("userId", "==", userId).where("id", "==", game.id);
    query.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        // game doesn't exist in savedGames collection, so add it
        db.collection("savedGames")
          .add({ ...game, userId })
          .then(() => {
            console.log("Game added to saved games");
            setSavedGames([...savedGames, { ...game, userId }]); // update saved games state
          })
          .catch((error) => {
            console.error("Error adding game to saved games:", error);
          });
      } else {
        // game exists in savedGames collection, so remove it
        querySnapshot.docs[0].ref.delete()
          .then(() => {
            console.log("Game removed from saved games");
            setSavedGames(savedGames.filter(savedGame => savedGame.id !== game.id)); // update saved games state
          })
          .catch((error) => {
            console.error("Error removing game from saved games:", error);
          });
      }
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
  
      {games.length > 0 && searchInput !== "" && (
  <div className="game-container">
    {games.map((game) => (
      <div className="game-box" key={game.id}>
        <img src={game.background_image} alt={game.name} />
        <h2>{game.name}</h2>
        <p>Rating: {game.rating}</p>
        <button onClick={() => {addToSavedGames(game); setSearchInput("")}}>
          {savedGames.some(savedGame => savedGame.id === game.id) ? "Remove from saved games" : "Add to saved games"}
        </button>
      </div>
    ))}
  </div>
)}
  
      <div className="saved-games-container">
        <h2>Saved Games</h2>
        {savedGames.map((game) => (
          <div className="gameBox" key={game.id}>
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <button onClick={() => {addToSavedGames(game); setSearchInput("")}}>
              Remove from saved games
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
}export default SavedGames;