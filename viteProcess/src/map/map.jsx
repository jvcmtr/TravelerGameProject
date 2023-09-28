import React from 'react'
import SCREENS from '../utils/pages.js'
import loader from '../utils/loaderUtils.js'

import Background from './mapImage.jsx'
import Button from '../components/button'
import NodesDrawer from './nodesDrawer'
import PathDrawer from './pathDrawer'
import SideDescription from './nodeDescription'
import Player from './playerIcon'

export default function Map({getPlayer, setPlayer, finishLoading, changePage}){

  const player = getPlayer();
  const [loaded, FORCE_RENDER] = React.useState(0)
  const [playerNode, setPlayerNodeOBJ] = React.useState()
  const PlayerRef = React.useRef()

  const nodes = React.useRef([]);
  const edges = React.useRef([]);

  const [selectedNode, setSelectedNode] = React.useState()
  const [activeSidebar, setActiveSidebar] = React.useState(true)

  React.useEffect(()=>{
    async function loadData(){   
      const data = await loader.getMapData(player)

      edges.current = data.edges
      nodes.current = data.nodes

      let node = nodes.current.find((n)=>{
        return n.id == player.travelInfo.currentlyOn
      })

      setPlayerNode(node)
      changeFocus(node)
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
    if(loaded > 0 && PlayerRef.current){
      PlayerRef.current.scrollIntoView({
        behavior: "smooth", 
        block: "center", 
        inline: "center" 
      })
      setSelectedNode({...playerNode})
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

    let p = player
    p.travelInfo.currentlyOn = node.id    
    setPlayer(p)
  }

  const FindNeibours = () => {
    if(loaded > 0){
      let neibours = []
      neibours.push(playerNode.id)
      
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

      return(neibours) 
    }
    return []
  }
  
  React.useEffect(()=>{
    if(loaded == 1){
      FocusOnPlayer()
      FORCE_RENDER(loaded+1)
    }
  }, [loaded])

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

