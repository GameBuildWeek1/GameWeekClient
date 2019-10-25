import React from "react";

function Controls(props) {
  return (
    <div className="directions">

      <button name='n' value="n" onClick={e => props.handleInput(e)}style={{padding: "15px 25px", fontSize: "30px"}}>
        ⬆
      </button>
      <div>
      <button name='w' value="w" onClick={e => props.handleInput(e)} style={{padding: "15px", fontSize: "30px"}}>
        ⬅
      </button>
      <button name='s' value="s" onClick={e => props.handleInput(e)} style={{padding: "15px 25px", fontSize: "30px"}}>
        ⬇
      </button>
      <button name='e' value="e" onClick={e => props.handleInput(e)} style={{padding: "15px", fontSize: "30px"}}>
        ➡
      </button>
      
      </div>
    </div>
  );
}

export default Controls;
