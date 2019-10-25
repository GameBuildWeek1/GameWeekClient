import React from "react";

function Controls(props) {
  return (
    <div className="directions">
      <div className="up">
        <button name="n" value="n" onClick={e => props.handleInput(e)}>
          ⬆
        </button>
      </div>
      <div>
        <button name="w" value="w" onClick={e => props.handleInput(e)}>
          ⬅
        </button>

        <button name="s" value="s" onClick={e => props.handleInput(e)}>
          ⬇
        </button>

        <button name="e" value="e" onClick={e => props.handleInput(e)}>
          ➡
        </button>
      </div>
    </div>
  );
}

export default Controls;
