const EndGame = () => {
    return ( 
        <div className="endGame"
        style={{ 
            backgroundImage: `url('./assets/images/end-game-back.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", 
        }}
        >
            <div className="endTexte">
            <img src="./assets/images/back-text-end-game.png" alt="end-game" className="endTexte__image"/>
            <h1>La partie est fini</h1>
            <p>Merci d'avoir jouer</p>
            </div>
        </div>
     );
}
 
export default EndGame;