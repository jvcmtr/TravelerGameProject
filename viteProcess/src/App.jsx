import './App.css'
import Map from './map/map'
import React from 'react'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const player = React.useRef()
  
  React.useEffect(()=>{
    async function loadData(){
      const response = await fetch('public/playerDefault.json')
      const playerInfo = await response.json()
      
      player.current = playerInfo
      setLoaded(true)
    }
    loadData()
  },[])  
  
  return (
    <main>
      {
        loaded? <Map playerInfo={player.current}></Map>: <h1>LOADING</h1>
      }
    </main> 
  )
}
