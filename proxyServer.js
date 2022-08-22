const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());

const API_KEY = process.env.API_KEY;

const getPlayerPUUID = (playerName) => {
  return axios
    .get(
      "https://na1.api.riotgames.com" +
        "/lol/summoner/v4/summoners/by-name/" +
        playerName +
        "?api_key=" +
        API_KEY
    )
    .then((respuesta) => {
      // console.log(respuesta.data)
      return respuesta.data.puuid;
    })
    .catch((error) => error);
};

//GET past5GAMES
//GET http://localhost:3000/pas5Games

app.get("/past5games", async (req, res) => {
  //   const playerName = "vlotz";
  const playerName = req.query.playerName;
  console.log(playerName);
  //PUUID
  const PUUID = await getPlayerPUUID(playerName);

  // console.log(PUUID.puuid)

  const API_CALL =
    "https://americas.api.riotgames.com" +
    "/lol/match/v5/matches/by-puuid/" +
    PUUID +
    "/ids" +
    "?api_key=" +
    API_KEY;

  // console.log(API_CALL)

  //Get API_CALL
  //its going to givr us a list of game IDS
  const gameIDs = await axios
    .get(API_CALL)
    .then((respuesta) => respuesta.data)
    .catch((error) => error);

  //   console.log(gameIDs);

  let matchDataArray = [];
  //   gameIDs.map((match, i) => {
  //     // console.log(match);
  //     const matchData = await axios.get("https://americas.api.riotgames.com/" +
  //             "lol/match/v5/matches/" +
  //             match +
  //             "?api_key=" +
  //             API_KEY
  //         )
  //         .then((respuesta) => respuesta.data)
  //         .catch((error) => error);
  //         matchDataArray.push(matchData)
  //   })
  // for (let i = 0; i < gameIDs.length - 15; i++) {
  //     console.log(gameIDs[i])
  // }

  for (let i = 0; i < gameIDs.length - 15; i++) {
    // console.log(gameIDs[i]);
    const matchID = gameIDs[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com/" +
          "lol/match/v5/matches/" +
          matchID +
          "?api_key=" +
          API_KEY
      )
      .then((respuesta) => respuesta.data)
      .catch((error) => error);
    matchDataArray.push(matchData);
  }

  // gameIDs.map((match)=>{

  // })

  // console.log(matchData)

  //Save information avobe in an array, give array as JSON response to user
  //[Game1Object, Game2Object]
  //   res.json({ message: "Hola mundos" });
  res.json(matchDataArray);
  // res.json({message: 'Hola mundos'})
  // console.log(matchDataArray)
  // console.log(matchDataArray)
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}/`);
});
