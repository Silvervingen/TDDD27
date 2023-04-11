import React, { useState, useEffect } from "react";
import "../css/Library.css"; // Import CSS file

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

function Library() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1); // Initialize page state with 1

  useEffect(() => {
    fetch(`https://rawg.io/api/games?page=${page}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => setGames(data.results))
      .catch(error => console.error('Error:', error));
  }, [page]);

  const handlePageChange = (value) => {
    setPage(Math.max(1, page + value)); // Set minimum value of 1
  }

  return (
    <div>
      <h1>Games</h1>
      <button onClick={() => handlePageChange(-1)}>Previous</button>
      <button onClick={() => handlePageChange(1)}>Next</button>
      <div className="game-container"> {/* Use a container to hold each game */}
        {games.map((game) => (
          <div className="game-box" key={game.id}> {/* Use a box for each game */}
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p> {/* Display the rating instead of the release date */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;