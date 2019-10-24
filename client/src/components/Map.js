import React, { useState, useEffect } from "react";
import axios from "axios";

import GameInfo from "./GameInfo";
import Controls from "./Controls";
import Chat from "./chat/Chat"
import {HOST_URL} from "./utils";
function Map(props) {
  const [information, setInformation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [move, setMove] = useState("");
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${HOST_URL}/api/adv/init/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("key")}`
        }
      })
      .then(res => {
        setInformation(res.data);
        createMap(res.data);
      })
      .catch(error => {
        console.log("Error loading..", error);
      });
  }, []);

  const handleInput = async e => {
    e.preventDefault();
    setMove(e.target.value)
    let a = await moveplayer(move);
    //setInformation(a);
    
  }

  const handleLogout = e => {
    e.preventDefault()
    props.history.push("/login")
    localStorage.clear();
    window.location.reload();
  }
  console.log("clg move", move);
  console.log("clg move obj", { move });

  // var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.moveTo(0,0);
  // ctx.lineTo(200,100);
  // ctx.stroke();

  return (
    <div className="map">
      <canvas width="50000000" height="5000000" id="cavasMap"></canvas >{/* this one is set to display none on initalization */}
      <canvas width="800" height="500" id="camera"></canvas >
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aecdcd44-8a2d-451f-af25-e82bf486f1b4/d70456w-af7c4d0d-b49e-485f-aefd-cb8928990831.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FlY2RjZDQ0LThhMmQtNDUxZi1hZjI1LWU4MmJmNDg2ZjFiNFwvZDcwNDU2dy1hZjdjNGQwZC1iNDllLTQ4NWYtYWVmZC1jYjg5Mjg5OTA4MzEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dp1GDblxq0XVypsnmM01GQ0_anl1zyX08PgHPTOfqFY" style={{"display": "none"}} id="wallTexture"></img>
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/95357a63791945.5abc4ccf1326c.png" style={{"display": "none"}} id="floorTexture"></img>
      <img src="https://i.imgur.com/711ppMR.png" style={{"display": "none"}} id="playerTexture"></img>
{/*       <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
      </canvas> */}
      <button onClick={handleLogout}>Logout</button>
      <Controls handleInput={handleInput} />
      <GameInfo information={information} />
    
      <Chat title={'dungeon'}/>
    </div>
  );
}

export default Map;

//all the canvas code starts here
var ctxmap = null;
var mapTemp = [];
var directions = [{x:0, y:-1},{x:0, y:1},{x:1, y:0},{x:-1, y:0},{x:-1, y:-1},{x:1, y:-1},{x:1, y:1},{x:-1, y:1}]
var ctxcam = null;
var tileSize = null;
var player = {x: -1, y: -1, z: 0}
var players = []
var camerpos = {x: 0, y: 0}
var floorTexture = null;
var wallTexture = null;
var playerTexture = null;
var message = null;
var createMap = (data) =>
{
  floorTexture = document.getElementById("floorTexture");
  wallTexture = document.getElementById("wallTexture");
  playerTexture = document.getElementById("playerTexture");
  ctxmap = document.getElementById("cavasMap").getContext('2d');
  ctxmap.canvas.style.display = "none";
  player = data.curpos;
  mapTemp = data.map.data;
  console.log(data);
  tileSize = 40;
  ctxcam = document.getElementById("camera").getContext('2d');
  renderFrame();
  return ctxmap;
}

var renderFrame = () =>
{
  if(!ctxcam || !ctxmap) return;
  var loc = {x: player.x, y: player.y}
  if(controls.left) {loc.x -= 1; moveplayer("w")}
  else if (controls.right){ loc.x +=1; moveplayer("e")}
  else if (controls.up) {loc.y -=1; moveplayer("n")}
  else if (controls.down) {loc.y += 1; moveplayer("s")}
  else moveplayer(" ");
  try
  {
    if(mapTemp[loc.y][loc.x] == 0)
      throw "";
    player.x = loc.x;
    player.y = loc.y;
  }catch{}
  
  var width = Math.round(ctxcam.canvas.width/tileSize);
  var height = Math.round(ctxcam.canvas.height/tileSize);
  var x = player.x- Math.round(width/2);
  var y = player.y - Math.round(height/2);
  camerpos.x = x;
  camerpos.y = y;
  controls = {
    left: false,
    up: false,
    right: false,
    down: false,
  }
  ctxcam.fillStyle = "#000";
  ctxcam.fillRect(0,0,ctxcam.canvas.width,ctxcam.canvas.height);
  camerpos.x = Math.min(Math.max(-1,camerpos.x), mapTemp[0].length-(width)+1);
  camerpos.y = Math.min(Math.max(-1,camerpos.y), mapTemp.length-((height))+1);
  renderMap(ctxcam, camerpos.x, camerpos.y);
  //draw others
  players.forEach((p) =>{
    if(p.z == player.z){
      if(!playerTexture)
      {
        ctxcam.fillStyle = "#A22";
        ctxcam.fillRect(((p.x-camerpos.x))*tileSize, ((p.y-camerpos.y))*tileSize, tileSize,tileSize);
      }
      else
      {
        let a = 0;
        for(var i = 0; i < p.uuid.length; i ++){
          a += p.uuid.charCodeAt(i);
        }
        ctxcam.drawImage(playerTexture,((p.x-camerpos.x))*tileSize - ((Math.round(a/3) % 10) +5), ((p.y-camerpos.y))*tileSize - ((Math.round(a/15) % 10)), tileSize,tileSize)
      }
      
      ctxcam.font = "bold 15px Arial";
      ctxcam.textAlign = "center";
      ctxcam.fillStyle = "#000000AA";
      ctxcam.fillText(p.name,(p.x-camerpos.x)*tileSize + (tileSize/2) + 3, ((p.y-camerpos.y))*tileSize - (tileSize/4) + 3)
      ctxcam.fillStyle = "#FFFFFFAA";
      ctxcam.fillText(p.name,(p.x-camerpos.x)*tileSize + tileSize/2, ((p.y-camerpos.y))*tileSize - tileSize/4);
      
    }
  });
  if(!playerTexture)
  {
    ctxcam.fillStyle = "#F00";
    ctxcam.fillRect(((player.x-camerpos.x))*tileSize, ((player.y-camerpos.y))*tileSize, tileSize,tileSize);
  }else
  {
    ctxcam.drawImage(playerTexture,((player.x-camerpos.x))*tileSize/* -Math.random()*20+10 */, ((player.y-camerpos.y))*tileSize/* -Math.random()*10 */, tileSize,tileSize)
  }
  ctxcam.font = "bold 15px Arial";
  ctxcam.textAlign = "center";
  ctxcam.fillStyle = "#000000AA";
  ctxcam.fillText("YOU",(player.x-camerpos.x)*tileSize + (tileSize/2) + 3, ((player.y-camerpos.y))*tileSize - (tileSize/10) + 3)
  ctxcam.fillStyle = "#FFFFFFAA";
  ctxcam.fillText("YOU",(player.x-camerpos.x)*tileSize + tileSize/2, ((player.y-camerpos.y))*tileSize - tileSize/10);
  if(message)
  {
    ctxcam.font = "bold 15px Arial";
    ctxcam.textAlign = "center";
    ctxcam.fillStyle = "#000000AA";
    ctxcam.fillText(message,(ctxcam.canvas.width/2)+2, 52);
    ctxcam.fillStyle = "#FFFFFFAA";
    ctxcam.fillText(message,ctxcam.canvas.width/2, 50);
  }
}
setInterval(renderFrame,300);

var controls = {
  left: false,
  up: false,
  right: false,
  down: false,
};


window.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37: // left arrow
    case 65:
      controls.left = true;
      break;
    case 38: // up arrow
    case 69:
      controls.up = true;
      break;
    case 39: // right arrow
    case 68:
      controls.right = true;
      break;
    case 40: // down arrow
    case 83:
      controls.down = true;
      break;
  }
}, false);


const moveplayer = (move) =>
  {
    
    axios
      .post(`${HOST_URL}/api/adv/move/`, {direction:move}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("key")}`
      }})
        .then(res => {
          updateplayers(res.data);
          return res.data;
        }).catch(error => {
          console.log('error moving..',error)
        })
  }

/* window.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 37: // left arrow
      controls.left = false;
      break;
    case 38: // up arrow
      controls.up = false;
      break;
    case 39: // right arrow
      controls.right = false;
      break;
    case 40: // down arrow
      controls.down = false;
      break;
  }
}, false); */
var randomColorOffset = Math.random();
var renderMap = (ctxmap, sx,sy) =>
{
  
  for (var y=sy; y < mapTemp.length; y++){
    try{
      for(var x = sx; x < mapTemp[y].length; x++){
        var texture = null;
        if(x < 0  || y < 0)
        {
          ctxmap.fillStyle = "#000";
        }
        else if(mapTemp[y][x] == 0)
        {
          ctxmap.fillStyle = '#000';
          directions.forEach((d) =>
          {
            try{
              if(mapTemp[y+d.y][x+d.x] != 0 && mapTemp[y+d.y][x+d.x] != null)
              {
                let color = randomColorOffset*y**(x*randomColorOffset+2) % 30 + 45;
                ctxmap.fillStyle = `rgb(${color}, ${color}, ${color})`
                //texture = wallTexture;
              }
            } catch{};
          });
        }
        else if(mapTemp[y][x] == 'E')
          ctxmap.fillStyle = '#CCA'
        else if(mapTemp[y][x] == 'S')
          ctxmap.fillStyle = '#AAA'
        else{

          ctxmap.fillStyle = '#999';
          let color = (randomColorOffset*y+2)**(x*randomColorOffset+2) % 40 + 123;
          ctxmap.fillStyle = `rgb(${color}, ${color}, ${color})`
          //texture = floorTexture;
        }
        if(!texture)
          ctxmap.fillRect(x*tileSize-sx*tileSize,y*tileSize-sy*tileSize,tileSize-1,tileSize-1);
        else
          ctxmap.drawImage(texture, x*tileSize-sx*tileSize,y*tileSize-sy*tileSize,tileSize,tileSize)
      }
    } catch{}
  }
}

const updateplayers = (data) =>
{
  player = data.curpos;
  players = data.players;
  if(data.map)
    mapTemp = data.map.data;
  if(!message) 
  {
    message = data.message;
  if(message)
    setTimeout(() => {
      message = null;
    }, 10000);
  }
}