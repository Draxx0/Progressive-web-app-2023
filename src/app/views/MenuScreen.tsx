import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";

const MenuScreen = () => {
  const {game, setGame} = useContext(GameContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(game);
    
    
  }, []);
  console.log("game :", game);

  const handleSubmit = () => {    
    
  };

  return (
    <div 
    className="menu-screen" 
    style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')`}}
    >
    
        <div className="userName">
        <img src="./assets/images/userName-input.png" alt="userName" className="userName__image"/>
        <input
          type="text"
          placeholder="Enter username"
          // onChange={(e) => setUsername(e.target.value)}
          className="userName__input"
        />
        </div>
      <div className="roche">
        <img src="./assets/images/button-ok.png" alt="roche" className="roche__image" onClick={handleSubmit}/>
      </div>
      <div className="feuille">
        <img src="./assets/images/feuilleu.png" alt="feuille" className="feuille__image"/>
      </div>
    </div>
  );
};

export default MenuScreen;
