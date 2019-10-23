import React from 'react';

function Controls(props) {
  return (
    <div className="directions">
      <button name='n' value="n" onClick={e => props.handleInput(e)}>
        W
      </button>

      <button name='w' value="w" onClick={e => props.handleInput(e)}>
        A
      </button>

      <button name='s' value="s" onClick={e => props.handleInput(e)}>
        S
      </button>

      <button name='e' value="e" onClick={e => props.handleInput(e)}>
        D
      </button>
    </div>
  )
}

export default Controls