import React from 'react'
import colours from '../utils/colours'

export default function PlayerIcon(props){

  const previousNode = React.useRef()
  const [node, setNode] = React.useState(previousNode.current || props.node)

  React.useEffect(()=>{
    setNode(props.node)
    previousNode.current = node
  },[props.node])

  React.useEffect(()=>{
    previousNode.current = props.node
  },[])
  
  return(
    <div 
      style={{
        height:"40px",
        width:"40px",
        position: 'absolute',
        top: (node.position.y - 40) + "px",
        left: (node.position.x + 10) + 'px',

        zIndex:'3',
        borderRadius:'100%',
        outlineColor: colours.action,
        outlineWidth: "15px",
        outlineStyle: "dashed",

        transitionDuration: '0.5s',
        backgroundColor: colours.action,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    }}  
    >
      <img src={"https://icon-library.com/images/knight-helmet-icon/knight-helmet-icon-23.jpg"}
        style={{
          filter: "invert(100%)",
          height:"38px",
          width: "38px",
        }}
        />
      {props.children}
    </div>
  )
}