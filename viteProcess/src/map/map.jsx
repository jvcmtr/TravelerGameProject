import React from 'react'
import Background from './background'
import Button from '../components/button'
import NodesDrawer from './nodesDrawer'
import PathDrawer from './pathDrawer'
import SideDescription from './nodeDescription'
import Player from './playerIcon'

export default function Map(props){
  const NeibouringNodes = React.useRef([])
  const [loaded, FORCE_RENDER] = React.useState(0)
  
  const [playerNode, setPlayerNode]= React.useState(props.playerInfo.travelInfo.currentlyOn)
  const PlayerRef = React.useRef()
  const [selectedNode, setSelectedNode] = React.useState({})
  const [activeSidebar, setActiveSidebar] = React.useState(true)

  React.useEffect(()=>{
    async function loadData(){   
      let node = props.nodes.find((n)=>{
        return n.id == playerNode
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
      setSelectedNode(playerNode)
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

  const FindNeibours = () => {
    if(loaded > 0){
      let neibours = []
      neibours.push(playerNode.id)
      
      props.edges.forEach((x)=>{
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
        <NodesDrawer data={props.nodes} changeFocus={changeFocus} />
        <PathDrawer 
          data={{nodes:props.nodes , paths: props.edges}}
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

