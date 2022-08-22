import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [serchText, setSerchText] = useState("");
  const [gameList, setGameList] = useState([]);
  const [gameListLoading, setGameListLoading] = useState(true);

  const getPlayerGames = (evento) => {
    axios
      .get("http://localhost:3000/past5games", {
        params: { playerName: serchText },
      })
      .then((respuesta) => {
        console.log(respuesta.data);
        setGameList(respuesta.data);
        setGameListLoading(!gameListLoading);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let unde = "soy undefined";
  let no = "no soy undefined";

  let game =
    gameList[0] === undefined
      ? console.log(unde)
      : gameList[0].info.gameCreation;

  // useEffect(() => {
  //   getPlayerGames();
  // }, []);

  return (
    <div className="root">
      <h2>Welcome to our proxy server app</h2>
      <input type="text" onChange={(e) => setSerchText(e.target.value)} />
      <button onClick={getPlayerGames}>
        Get the past 5 games form your player
      </button>
      <br />
      <p>An apology for the speed, we host our own servers.</p>
      <br />
      {/* hola soy {game} */}
      <br />

      {/* {gameListLoading ? (
        <div>Loading...</div>
      ) : (
        gameList.map((game) => (
          <div key={game.gameId}>
            <h3>{game.gameId}</h3>
            <p>{game.info.gameCreation}</p>
          </div>
        ))
      )} */}
      {/* {
      gameList.
     } */}
      {gameListLoading ? (
        <div>Loading...</div>
      ) : (
        gameList.map((game, index) => (
          <div key={index}>
            <h3>{game.gameId}</h3>
            <p>{game.info.gameCreation}</p>
          </div>
        ))
      )}

      {/* {gameList.length > 0 ? (
        gameList.map((game, index) => (
          <div key={index}>
            <p>{game.info.gameCreation}</p>
          </div>
        ))
      ) : (
        <p>Empieza Buscando a alguien</p>

      )} */}
      <br />
    </div>
  );
}

export default App;
