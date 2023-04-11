import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.rawg.io/api/games', {
        headers: {
          'User-Agent': 'My Game App',
          'Authorization': '0fbb76c073e64b8a919b4c0f0cf05a0b'
        }
      });
      setGames(response.data.results);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;