import React, { useState, useEffect } from "react";
import axios from "axios";

import GameInfo from "./GameInfo";
import Controls from "./Controls";
import Chat from "./chat/Chat";

function Map(props) {
  const [information, setInformation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [direction, setDirection] = useState("");
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://build-week-game-server.herokuapp.com/api/adv/init/", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("key")}`
        }
      })
      .then(res => {
        setInformation(res.data);
        console.log("clg da res.data", res.data);
        localStorage.getItem("key");
      })
      .catch(error => {
        console.log("Error loading..", error);
      });
  }, []);

  const handleInput = e => {
    e.preventDefault();

    setDirection(e.target.value);

    axios
      .post(
        "https://build-week-game-server.herokuapp.com/api/adv/move/",
        { direction },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("key")}`
          }
        }
      )
      .then(res => {
        setInformation(res.data);
      })
      .catch(error => {
        console.log("error moving..", error);
      });
  };

  console.log("clg move", direction);
  console.log("clg move obj", { direction });

  // var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.moveTo(0,0);
  // ctx.lineTo(200,100);
  // ctx.stroke();

  return (
    <div className="map">
      {/* <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
      </canvas> */}

      <Controls handleInput={handleInput} />
      <GameInfo information={information} />
      <Chat title={"EscD"} />
    </div>
  );
}

export default Map;
