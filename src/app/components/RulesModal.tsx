import { useEffect, useState } from "react";
import { getRules } from "../../api/db/read";
import { Rule } from "../../api/db/utils";

const  RulesModal = () => {
     
    const [rules, setRules] = useState<Rule | null>(null);

    useEffect(() => {
     getRules(setRules);
    }, []);

    // console.log(rules);
    

    

    return ( 
        <div className="rulesModal"
            style={{ backgroundImage: `url('./assets/images/remote-menu-bg.jpg')` }}
        >   
        <div className="overlay">
            <h2>Les règles du jeu</h2>
            <ul>
                <li>Temps avant que la carte se joue: {rules?.delayToPlay} sec</li>
                <li>Nombre de joueurs : {rules?.maxPlayers}</li>
                <li> Objectif du jeu : Se débarrasser de toutes ses cartes en premier.</li>
                <li>Déroulement du jeu : Les joueurs retournent leurs cartes une par une. Si deux cartes ont le même symbole, les joueurs doivent attraper le totem en bois. Le joueur qui attrape le totem en premier donne toutes ses cartes à l'autre joueur.</li>
            </ul>
        </div>
        </div>      
        
     );
}
 
export default RulesModal ;