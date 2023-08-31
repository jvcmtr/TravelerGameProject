import './App.css'
import React from 'react'
import Screens from './utils/pages.js'

import Map from './map/map'
import Event from './event/event'
import MyNavigator from './myNavigation'

import BGArea from './components/layout/backgroundArea'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const player = React.useRef();
  const setPlayer = (newPlayer) => {player.current = newPlayer}
  
  React.useEffect(()=>{
    async function loadData(){
      const response = await fetch('public/playerDefault.json')

      const playerInfo = await response.json()
      player.current = playerInfo

      setLoaded(true)
    }
    loadData()
  },[])  

  if(!loaded){
    return(
    <BGArea> 
    </BGArea>
    )
  }

  return (
    <main>
      <MyNavigator default={Screens.EVENT}>
        <Map
            pageId={Screens.MAP} 
            player={player.current} 
            setPlayer={setPlayer} 
        />

        <Event
            pageId={Screens.EVENT} 
            player={player.current} 
            setPlayer={setPlayer} 
        />

        <h1 pageId={Screens.INVENTORY}> 
          INVENTORY NOT IMPLEMENTED 
        </ h1>

      </MyNavigator>
    </main> 
  )
}
