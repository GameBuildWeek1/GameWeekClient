import React, { useState, useEffect } from 'react'
import axios from 'axios';

import GameInfo from './GameInfo'

function Map() {
  const[information, setInformation] = useState({})
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://build-week-game-server.herokuapp.com/api/adv/init/')
        .then(res => {
          console.log('clg da res.data', res.data)
          setInformation(res.data)
        }).catch( error => {
          console.log('Error loading..', error)
        })
  }, [])

  return (
    <div className="map">
      <GameInfo information={information} />
    </div>
  )
}

export default Map