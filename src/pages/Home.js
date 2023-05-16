import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../pictures/GameTrackr.png';

import { db } from '../javascript/firestore';

function Home() {
  const [gamesWithOccurrences, setGamesWithOccurrences] = useState([]);

  useEffect(() => {
    db.collection('savedGames')
      .get()
      .then((querySnapshot) => {
        const savedGames = [];
        querySnapshot.forEach((doc) => {
          savedGames.push(doc.data());
        });

        // Count the occurrences of each game
        const gamesMap = new Map();
        savedGames.forEach((game) => {
          const gameId = game.id;
          if (gamesMap.has(gameId)) {
            gamesMap.set(gameId, gamesMap.get(gameId) + 1);
          } else {
            gamesMap.set(gameId, 1);
          }
        });

        // Create an array of game objects with occurrences
        const gamesWithOccurrences = savedGames.map((game) => {
          const gameId = game.id;
          return { ...game, occurrences: gamesMap.get(gameId) };
        });

        // Sorting logic - Sort the games by occurrences or any other criteria
        const sortedGamesByOccurrences = gamesWithOccurrences.sort((a, b) => {
          if (a.occurrences > b.occurrences) {
            return -1; // a should be before b
          } else if (a.occurrences < b.occurrences) {
            return 1; // b should be before a
          } else {
            return 0; // a and b have equal occurrences
          }
        });

        setGamesWithOccurrences(sortedGamesByOccurrences);
      })
      .catch((error) => {
        console.error('Error getting saved games:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The purpose of the website is to offer a platform for users to keep track of the games they like. This can be useful for players who want a list of the games
          they have played or the games they want to play in the future. By creating an account and adding games to their list, users can keep track of which games they
          have played, which games they have liked, and which games they want to play next.
        </p>
      </header>

      {gamesWithOccurrences.length > 0 ? (
        <div className="list-container">
          {gamesWithOccurrences.map((game) => (
            <div className="gameBox" key={game.id}>
              <Link to={`/GameInfo/${game.id}`} key={game.id} className="Links" game={game}>
                <img src={game.background_image} alt={game.name} />
                <h2>{game.name}</h2>
                <p>Rating: {game.rating}</p>
                <p>Occurrences: {game.occurrences}</p>
              </Link>
              <button
                className="SavedButton"
                onClick={() => {
                  // Handle removing the game from saved games
                }}
              >
                Remove from saved games
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved games found.</p>
      )}
    </div>
  );
}

export default Home;
/*{savedGames.length > 0 ? (
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
    ) */
