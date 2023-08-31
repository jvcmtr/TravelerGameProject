import React from 'react'
import {innerJointById} from '../utils/utils.js'
import SCREENS from '../utils/pages.js'

import Background from './mapImage.jsx'
import Button from '../components/button'
import NodesDrawer from './nodesDrawer'
import PathDrawer from './pathDrawer'
import SideDescription from './nodeDescription'
import Player from './playerIcon'

export default function Map({player, setPlayer, finishLoading, changePage}){

  const [loaded, FORCE_RENDER] = React.useState(0)
  const [playerNode, setPlayerNodeOBJ] = React.useState()
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
      console.log(finishLoading)
      finishLoading.call(this)
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

    if(!node.concluded){
      changePage(SCREENS.EVENT)
    }
  }

  const setPlayerNode = (node) =>{
    setPlayerNodeOBJ(node)
    setPlayer.call(this, {
      ...player,
      travelInfo : {
        ...player.travelInfo,
        currentlyOn : node.id
      }
    })
  }

  const FindNeibours = () => {
    if(loaded > 0){
      let neibours = []
      neibours.push(playerNode)
      
      edges.current.forEach((x)=>{
        let a = x.node_a;
        let b = x.node_b
        
        if(a == playerNode.id){
          neibours.push(b)
        }
        if(b == playerNode.id && !x.one_way){
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
          <Player node={playerNode}> 
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

