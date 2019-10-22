import React, { useState, useEffect } from 'react'
import axios from 'axios';

function GameInfo(props) {

  console.log('clg da props', props)
  console.log('clg da props info', props.information)

  return (
    <div className="adv-init">
      <p>
        {/* id: {props.information.uuid} */}
      </p>

      <p>
        name: {props.information.name}
      </p>

      <p>
        title: {props.information.title}
      </p>

      <p>
        description: {props.information.description}
      </p>
    </div>
  )
}

export default GameInfo