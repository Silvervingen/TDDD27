import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Library.css"; // Import CSS file

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

function Library() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1); // Initialize page state with 1

  useEffect(() => {
    const count=1000;
    fetch(`https://api.rawg.io/api/games?page=${page}&key=${apiKey}&metacritic=50,100&ordering=-rating&ratings_count_min=1000&exclude_additions=true`)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      })
      .catch(error => console.error('Error:', error));
  }, [page]);


  const handlePageChange = (value) => {
    setPage(Math.max(1, page + value)); // Set minimum value of 1
  }

  /*
  const filteredGames2 = games.filter((game) => game.ratings_count >= 10);
  
  const sortedGames = filteredGames2.sort((a, b) => {
    if (b.rating_count !== a.rating_count) {
      return b.rating_count - a.rating_count;
    }
    return a.name.localeCompare(b.name);

  const sortedGames = games.sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return a.name.localeCompare(b.name);
  });*/

  return (
    <div>
      <h1>Games</h1>
      <button className ="Previous" onClick={() => handlePageChange(-1)}>Previous</button>
      <button className = "Next" onClick={() => handlePageChange(1)}>Next</button>

      <div className="game-container"> {/* Use a container to hold each game */}
        {games.map((game) => (
          <Link to={`/GameInfo/${game.id}`} key={game.id} game={game}>
            <div className="game-box"> {/* Use a box for each game */}
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p> {/* Display the rating instead of the release date */}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );

}


export default Library;