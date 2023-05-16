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
  const [selectedOption, setSelectedOption] = useState("rating");
  const [selectedList, setSelectedList] = useState("list1"); // Track the selected list

  useEffect(() => {
    const count = 1000;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&metacritic=50,100&ordering=-${selectedOption}&ratings_count_min=1000&exclude_additions=true&rating_min=2.5&search=${searchInput}`;
    setGames([]); // reset games state to empty array, so its is possible to change order mulitple times
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      })
      .catch(error => console.error('Error:', error));
  }, [selectedOption, searchInput]);

  useEffect(() => {
    // Get saved games from the database for the current user and selected list
    const userId = auth.currentUser.uid;
    let query = db.collection("savedGames").where("userId", "==", userId);
    
    if (selectedList !== null) {
      query = query.where("listId", "==", selectedList); // Filter by the selected list
    }

    query.get()
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
  }, [selectedList]);

  const addToSavedGames = (game) => {
    const userId = auth.currentUser.uid;
    const query = db.collection("savedGames").where("userId", "==", userId).where("listId", "==", selectedList).where("id", "==", game.id);
  
    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          // Game doesn't exist in savedGames collection, so add it
          db.collection("savedGames")
            .add({ ...game, userId, listId: selectedList }) // Assign the selected list to the game
            .then(() => {
              console.log("Game added to saved games");
              const updatedSavedGames = [
                ...savedGames,
                { ...game, userId, listId: selectedList },
              ];
              setSavedGames(updatedSavedGames); // Update saved games state
            })
            .catch((error) => {
              console.error("Error adding game to saved games:", error);
            });
        } else {
          // Game exists in savedGames collection, so remove it
          querySnapshot.docs[0].ref
            .delete()
            .then(() => {
              console.log("Game removed from saved games");
              const updatedSavedGames = savedGames.filter(
                (savedGame) =>
                  savedGame.id !== game.id || savedGame.listId !== selectedList
              );
              setSavedGames(updatedSavedGames); // Update saved games state
            })
            .catch((error) => {
              console.error("Error removing game from saved games:", error);
            });
        }
      });
  };
  

  const handleListChange = (event) => {
    const newListId = event.target.value;
    setSelectedList(newListId);
    };
    
    return (
    <div className="Listpage">
    

  <div className="saved-games-container">
    <h2>Saved Games</h2>
    <div className="list-buttons">
  <div>
    <button
      onClick={() => handleListChange({ target: { value: "list1" } })}
      className={selectedList === "list1" ? "active" : "list"}
    >
      Games I Have
    </button>
    <button
      onClick={() => handleListChange({ target: { value: "list2" } })}
      className={selectedList === "list2" ? "active" : "list"}
    >
      Games I Want
    </button>
    <button
      onClick={() => handleListChange({ target: { value: "list3" } })}
      className={selectedList === "list3" ? "active" : "list"}
    >
      Games Completed
    </button>
    <button
      onClick={() => handleListChange({ target: { value: "list4" } })}
      className={selectedList === "list4" ? "active" : "list"}
    >
      Games I Hate
    </button>
  </div>
</div>

<div className="sgLibrary-header">
    <div id="sgsb2">
    <input id="sgsb" type="text" placeholder="Search for games to add to selected list" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    <select name="Filter" id="Filter" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
      <option value="rating" selected>Rating</option>
      <option value="released">Newest</option>
      <option value="Popular">Popular</option>
    </select>
    </div>
    </div>
    {games.length > 0 && searchInput !== "" && (
    <div className="game-container">
      {games.map((game) => (
        <div className="game-boxes" key={game.id}>
          <img src={game.background_image} alt={game.name} />
          <h2>{game.name}</h2>
          <p>Rating: {game.rating}</p>
          <button className="remove" onClick={() => { addToSavedGames(game); setSearchInput(""); }}>
            {savedGames.some(savedGame => savedGame.id === game.id) ? "Remove from saved games" : "Add to saved games"}
          </button>
        </div>
      ))}
    </div>
  )}
<div className="list-container">
    {savedGames.length > 0 ? (
      savedGames.map((game) => (
        <div className="gameBox" key={game.id}>
          <Link to={`/GameInfo/${game.id}`} key={game.id} className="Links" game={game}>
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
          </Link>
          <button className="SavedButton" onClick={() => { addToSavedGames(game); setSearchInput(""); }}>
            Remove from saved games
          </button>
        </div>
      ))
    ) : (
      <p>No saved games found.</p>
    )}
  </div>
</div>
</div>
);

}

export default SavedGames;
