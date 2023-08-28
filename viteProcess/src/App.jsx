import './App.css'
import Map from './map/map'
import React from 'react'
import Screens from './constants/pages.js'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const player = React.useRef();
  const setPlayer = (newPlayer) => {player.current = newPlayer}

  const currentScreen = Screens.MAP
  
  React.useEffect(()=>{
    async function loadData(){
      const response = await fetch('public/playerDefault.json')

      const playerInfo = await response.json()
      player.current = playerInfo

      setLoaded(true)
    }
    loadData()
  },[])  
  
  if(currentScreen == Screens.MAP && loaded){
    return <Map player={player.current} setPlayer={setPlayer}></Map>
  }

  if(currentScreen == Screens.EVENT && loaded){
    return <h1> PAGE NOT IMPLEMENTED </ h1>
  }

  if(currentScreen == Screens.INVENTORY && loaded){
    return <h1> PAGE NOT IMPLEMENTED </ h1>
  }

  return (
    <main>
      {
        loaded? <h1> LOADED </h1>: <h1>LOADING</h1>
      }
    </main> 
  )
}
