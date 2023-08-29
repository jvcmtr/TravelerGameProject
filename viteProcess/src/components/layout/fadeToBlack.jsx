import React from 'react'

export default function FadeToBlack(props){

    const Dark = React.useState(props.Dark)

  return(
    <div 
      style={{
        zIndex: '10',
        x: '0',
        y:'0',
        position: 'fixed',
        height:"100vh",
        width:"100vw",
        backgroundColor: "#000",
        opacity: Dark? 0 : 1,
        transitionDuration: '1s',

        pointerEvents: 'none'
    }}  
    >
      {props.children}
    </div>
  )
}