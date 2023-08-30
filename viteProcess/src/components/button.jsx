import React from 'react'
import colours from '../utils/colours'

export default function MyButton(props){

  const [hover, setHover] = React.useState(false)
  
  return(
    <div 
      onClick={props.onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        borderRadius:'100%',
        outlineColor: colours.secondary,
        outlineWidth: "2px",
        outlineStyle: "dashed",

        transitionDuration: '0.2s',
        transform: `scale(${hover? '1.2': '1.0'})`,
        filter: hover? "brightness(1.5)" : "", 
        backgroundColor: colours.action,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        ...props.style
    }}  
    >
      <img src={props.img}
        style={{
          height:"50px",
          width: "50px",
          opacity: "0.7"
        }}
        />
      {props.children}
    </div>
  )
}