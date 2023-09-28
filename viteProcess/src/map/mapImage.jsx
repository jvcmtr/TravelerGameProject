import React from 'react'

export default function background(){
  const press = React.useRef(false)
  const mousePos = React.useRef({ top: 0, left: 0, x: 0, y: 0 })
  const rootRef = React.useRef(document.getElementById('root'))

  const handleMouseDown = (e) =>{
      mousePos.current = {
        left: window.scrollX,
        top: window.scrollY,
        
        x: e.clientX,
        y: e.clientY,
    };
    
    press.current = true;
  }
    
  const panHandler = (e) =>{
    
    if(press.current){
      const dx = e.clientX - mousePos.current.x;
      const dy = e.clientY - mousePos.current.y;
      window.scroll((mousePos.current.left - dx), (mousePos.current.top - dy ))
    }
  }
  
  return (
    <img 
      onMouseDown={handleMouseDown} 
      onMouseUp={()=>press.current=false} 
      onMouseMove={panHandler} 
      draggable={false}
      
      id='mapImg'
      style={{
        position: 'absolute',
        top: 0,
        left:0,
        //transform: 'scale(0.5) translate(-50%, -50%)',
      }} 
      src='public/images/worldMap2.jpg'/>
  )
}