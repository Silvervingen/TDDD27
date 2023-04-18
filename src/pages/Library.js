import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Library.css"; // Import CSS file

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

function Library() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1); // Initialize page state with 1
  const [selectedOption, setSelectedOption] = useState("rating");
  const [searchInput, setSearchInput] = useState("");

  //https://api.rawg.io/api/games?dates=2001-01-01,2001-12-31&ordering=-rating // mest popular game in 2019
  
  useEffect(() => {
    const count = 1000;
    const url = `https://api.rawg.io/api/games?page=${page}&key=${apiKey}&metacritic=50,100&ordering=-${selectedOption}&ratings_count_min=1000&exclude_additions=true&rating_min=2.5&search=${searchInput}`;
    setGames([]); // reset games state to empty array, so its is possible to change order mulitple times
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      })
      .catch(error => console.error('Error:', error));
  }, [page, selectedOption, searchInput]);

 
  useEffect(() => {
    setFilteredGames([...games]); // Copy the games array to filteredGames
  }, [games]);

  const handlePageChange = (value) => {
    setPage(Math.max(1, page + value)); // Set minimum value of 1
  }

  useEffect(() => {
    // Sort the filtered games based on the selected option
    const sortedGames = [...filteredGames].sort((a, b) => {
      if (a[selectedOption] > b[selectedOption]) {
        return -1;
      } else if (a[selectedOption] < b[selectedOption]) {
        return 1;
      }
      return 0;
    });    setFilteredGames(sortedGames);
  }, [selectedOption]);

  return (
    <div>

      <div className="Library-header">
          <h1>Games</h1>
        <div id="searchbar2">
          <input id="searchbar" type="text" placeholder="Search.." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </div>
        <div className="Dropdown-meny">
          <select name="Filter" id="Filter" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="rating" selected>Rating</option> {/* Selected är deafult som visas */}
            <option value="released">Newest</option>
            <option value="Popular">Popular</option>
          </select>
          </div>
      </div>
     
      <div className="game-container"> {/* Use a container to hold each game */}
      {filteredGames.map((game) => (
  <Link to={`/GameInfo/${game.id}`} key={game.id} game={game}>
    <div className="game-box">
      <img src={game.background_image} alt={game.name} />
      <h2>{game.name}</h2>
      <p>Rating: {game.rating}</p>
    </div>
  </Link>
))}

      </div> 
        <div className="Library-footer">
      <button className ="Previous" onClick={() => handlePageChange(-1)}>Previous</button>
      <button className = "Next" onClick={() => handlePageChange(1)}>Next</button>
      </div>
    </div>

  );

}


export default Library;
