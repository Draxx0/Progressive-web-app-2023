import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGame } from "../../api/db/read";
import { Game } from "../../api/db/utils";
import { GameContext } from "../contexts/gameContext";


const MenuScreen = () => {
  const { game, setGame } = useContext(GameContext);
  const navigate = useNavigate();
  
  const handleSubmit = () =>{}

  return (
<>
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
        <img
          src="./assets/images/button-ok.png"
          alt="roche"
          className="roche__image"
          onClick={handleSubmit}
        />
      </div>
      <div className="feuille">
        <img
          src="./assets/images/feuilleu.png"
          alt="feuille"
          className="feuille__image"
        />
      </div>
</>
    
  
  );
};

export default MenuScreen;
