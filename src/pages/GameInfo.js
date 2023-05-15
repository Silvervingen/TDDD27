import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/GameInfo.css";
import { db, auth } from "../javascript/firestore";



import ps5Image from '../pictures/PS5.png'
import ps4Image from '../pictures/PS4.png'
import ps3Image from '../pictures/PS3.png'
import ps2Image from '../pictures/PS2.png'
import pspImage from '../pictures/PSP.png'

import XboxOne from '../pictures/XboxOne.png'
import XboxSX from '../pictures/XboxXS.png'
import Xbox360 from '../pictures/Xbox360.png'

import Switch from '../pictures/Switch.png'
import GBA from '../pictures/GBA.png'
import Wii from '../pictures/Wii.png'
import WiiU from '../pictures/WiiU.png'

import Pc from '../pictures/PC.png'
import Linux from '../pictures/Linux.png'
import Apple from '../pictures/MacOS.png'
import Android from '../pictures/Android.png'
import iOS from '../pictures/iOS.png'
import Dreamcast from '../pictures/Dreamcast.png'

const apiKey = '0fbb76c073e64b8a919b4c0f0cf05a0b';

const platformImages = {
    "PlayStation 5": ps5Image,
    "PlayStation 4": ps4Image,
    "PlayStation 3": ps3Image,
    "PlayStation 2": ps2Image,
    "PSP": pspImage,
    "Xbox Series S/X": XboxSX,
    "Xbox 360": Xbox360,
    "Xbox One": XboxOne,
    "Nintendo Switch": Switch,
    "PC": Pc,
    "Linux": Linux,
    "macOS": Apple,
    "Game Boy Advance" : GBA,
    "Wii" : Wii,
    "Wii U" : WiiU,
    "Wii U" : WiiU,
    "Android" : Android,
    "iOS" : iOS,
    "Dreamcast" : Dreamcast,

    // Add images for other platforms here
    // titta på att ta bort linux, mac, andra konoler som anses onödiga
    // fixa visuellt så bilderna för plattformarna blir lika stora.
  };


function GameInfo() {
  const [game, setGame] = useState({});
  const { id } = useParams();
  const [screenshots, setScreenshots] = useState([]);

  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(error => console.error('Error:', error));

    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`)
      .then(res => res.json())
      .then(data => setScreenshots(data.results))
      .catch(error => console.error('Error:', error));
  
  }, [id]);

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
    <div class="Info-container">
        <div class="gameContainer">
        <img src={game.background_image} alt={game.name} class="gameSplashart" />
        <h1 id="gameName">{game.name}</h1>
      <h4>Rating: {game.rating}</h4>
      <h4>Released: {game.released}</h4>
      {auth.currentUser && (
          <button onClick={() => addToSavedGames(game)}>
            {savedGames.some((savedGame) => savedGame.id === game.id)
              ? "Remove from saved games" // If game alredy exist in list
              : "Add to saved games"} 
          </button>
        )}
      <h2>Description</h2>
      <p>{game.description_raw}</p>
      <h2>Platforms</h2>
      {game.platforms?.map((platform) => (
        <img class='platformLogo' src={platformImages[platform.platform.name]} alt={platform.platform.name} />
    ))} 
    
    </div>
    <div class="gameContainer2">
    <div className="game-screenshots">
          {screenshots.map(screenshot => (
            <img class= "InGameSS" key={screenshot.id} src={screenshot.image} alt={`Screenshot ${screenshot.id}`} />
          ))}
        
        </div>
   </div>
   
	<button className = "Next" onClick={() => window.history.back()}>Go Back</button>
  
</div>

  );
}

export default GameInfo;