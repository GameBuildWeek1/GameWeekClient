import React, { useState, useEffect } from 'react'
import axios from 'axios';

import GameInfo from './GameInfo'

function Map(props) {
  const[information, setInformation] = useState({})
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);

    axios
      .get('https://build-week-game-server.herokuapp.com/api/adv/init/', {headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("key")}`
      }})
        .then(res => {
          setInformation(res.data)
          console.log('clg da res.data', setInformation(res.data))
          localStorage.getItem('key')
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