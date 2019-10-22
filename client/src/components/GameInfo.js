import React, { useState, useEffect } from 'react'
import axios from 'axios';

function GameInfo(props) {

  console.log('clg da props', props)
  const[information, setInformation] = useState({})
  const[isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get('https://build-week-game-server.herokuapp.com/api/adv/init/')
  //       .then(res => {
  //         console.log('clg da res.data', res.data)
  //         return res.data
  //       }).catch( error => {
  //         console.log('Error loading..', error)
  //       })
  // }, [])
  return (
    <div className="adv-init">
      <p>
        id: {props.information.uuid}
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