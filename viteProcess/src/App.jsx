import './App.css'
import Map from './map/map'
import React from 'react'
import Screens from './constants/pages.js'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const player = React.useRef();
  const edges = React.useRef();
  const nodes = React.useRef();
  const currentScreen = Screens.MAP
  
  React.useEffect(()=>{
    async function loadData(){
      const response = await fetch('public/playerDefault.json')
      const responseE = await fetch('public/connections.json')
      const responseN = await fetch('public/mapNodes.json')

      const playerInfo = await response.json()
      const dataE = await responseE.json()
      const dataN = await responseN.json()

      edges.current = dataE
      nodes.current = dataN
      player.current = playerInfo

      setLoaded(true)
    }
    loadData()
  },[])  

  
  
  if(currentScreen == Screens.MAP && loaded){
    return <Map playerInfo={player.current} edges={edges.current} nodes={nodes.current} ></Map>
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
