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
  const setPlayer = (newPlayer) => { player.current = newPlayer}
  const getPlayer = () => {return player.current} // This is required to make sure the player.current is properly loaded/updated on the child components. i am not realy sure why. 
  
  React.useEffect(()=>{
    async function loadData(){
      const response = await fetch('public/playerDefault.json')

      const playerInfo = await response.json()
      player.current = playerInfo

      setLoaded(true)
    }
    if(!loaded){
      loadData()
    }
  },[])  

  if(!loaded){
    return(
    <BGArea> 
    </BGArea>
    )
  }

  return (
    <main>
      <MyNavigator default={Screens.MAP}>
        <Map
            pageId={Screens.MAP} 
            getPlayer={getPlayer} 
            setPlayer={setPlayer} 
        />

        <Event
            pageId={Screens.EVENT} 
            getPlayer={getPlayer} 
            setPlayer={setPlayer} 
        />

        <h1 pageId={Screens.INVENTORY}> 
          INVENTORY NOT IMPLEMENTED 
        </ h1>

      </MyNavigator>
    </main> 
  )
}
