import DiamondIcon from '../components/diamondIcon'
import React from 'react'

export default function MapIcon(props){

  const [hover, setHover] = React.useState(false)
  
  return(
    <div 
      onClick={props.onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        position: 'absolute',
        zIndex: 2,
        top: props.position.y,
        left: props.position.x,
        
        userSelect: 'none',
        transitionDuration: '0.2s',
        transform: `scale(${hover? '1.2': '1.0'})`
      }}
    >
      <DiamondIcon>
        {props.icon}
      </DiamondIcon>
    </div>
  )
}