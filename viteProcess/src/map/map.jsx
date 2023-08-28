import React from 'react'
import {innerJointById} from '../utils.js'

import Background from './background'
import Button from '../components/button'
import NodesDrawer from './nodesDrawer'
import PathDrawer from './pathDrawer'
import SideDescription from './nodeDescription'
import Player from './playerIcon'

export default function Map({player, setPlayer}){

  const [loaded, FORCE_RENDER] = React.useState(0)
  const playerNode = React.useRef()
  const PlayerRef = React.useRef()

  const nodes = React.useRef([]);
  const edges = React.useRef([]);

  const NeibouringNodes = React.useRef([])
  const [selectedNode, setSelectedNode] = React.useState({})
  const [activeSidebar, setActiveSidebar] = React.useState(true)

  React.useEffect(()=>{
    async function loadData(){   

      const responseE = await fetch('public/connections.json')
      const responseN = await fetch('public/mapNodes.json')
      const dataE = await responseE.json()
      const dataN = await responseN.json()

      edges.current = innerJointById(player.travelInfo.discoveredEdges, dataE)
      nodes.current = innerJointById(player.travelInfo.discoveredNodes, dataN)

      let node = dataN.find((n)=>{
        return n.id == player.travelInfo.currentlyOn
      })
      setSelectedNode(node)
      setPlayerNode(node)
      
      FORCE_RENDER(loaded+1)
      FocusOnPlayer()
    }
    loadData()
  },[])
  
  const changeFocus = (node) =>{
    setSelectedNode(node)
    setActiveSidebar(true)
    FORCE_RENDER(loaded+1)
  }
  
  const FocusOnPlayer = () =>{
    if(loaded > 0){
      PlayerRef.current.scrollIntoView({
        behavior: "smooth", 
        block: "center", 
        inline: "center" 
      })
      setSelectedNode(player.travelInfo.currentlyOn)
    }
  }

  const movePlayer = (node) =>{
    setPlayerNode(node)
    setSelectedNode(node)
    
    let a = setTimeout(()=>{
      FocusOnPlayer()
      setSelectedNode(node)
    }, 300)
  }

  const setPlayerNode = (node) =>{
    setPlayer.call(this, {
      ...player,
      travelInfo : {
        ...player.travelInfo,
        currentlyOn : node.id
      }
    })
    playerNode.current = node
  }

  const FindNeibours = () => {
    if(loaded > 0){
      let neibours = []
      neibours.push(player.travelInfo.currentlyOn)
      
      edges.current.forEach((x)=>{
        let a = x.node_a;
        let b = x.node_b
        
        if(a == player.travelInfo.currentlyOn){
          neibours.push(b)
        }
        if(b == player.travelInfo.currentlyOn && !x.one_way){
          neibours.push(a)
        }
      })

      NeibouringNodes.current = neibours
      return(neibours) 
    }
    return []
  }
  
  return (
    <div style={{display: 'inline-block', position: "absolute", top:"0", left:"0"}} >
      <Background/>
      { loaded &&(
        <>
        <NodesDrawer data={nodes.current} changeFocus={changeFocus} />
        <PathDrawer 
          data={{nodes:nodes.current , paths: edges.current}}
        />     
        <SideDescription 
          key={loaded}
          active={activeSidebar}
          travelTo={movePlayer}
          travelAllowedFor={FindNeibours()}
          node={selectedNode}  
        />
          <Player node={playerNode.current}> 
            <div ref={PlayerRef}/> 
          </Player>
        </>
      )}
      <Button onClick={FocusOnPlayer}   
        img="https://icons.veryicon.com/png/o/miscellaneous/offerino-icons/target-39.png" 
        style={{        
          height:"50px",
          width:"50px",
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          zIndex:'3',
        }}
      />

    </div>
  )
}

