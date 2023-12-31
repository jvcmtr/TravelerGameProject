import React from 'react'
import Icon from './mapIcon'

export default function MyCanvas(props){
  var nodes = props.data
  
  return (
    <div>
        {
        nodes &&(
         nodes.map((node) => {return(
           <Icon 
             key={"NODE"+node.id}
             onClick={()=>props.changeFocus(node)}
             position={node.position} 
             icon={node.symbol}/>
         )}) 
        )
      }
    </div>
  )
}
