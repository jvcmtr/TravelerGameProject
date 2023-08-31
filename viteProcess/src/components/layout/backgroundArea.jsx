import React from 'react'
import colours from '../../utils/colours'

export default function FullScreenArea(props){
  return(
    <div 
      onClick={props.onClick}
      style={{
        height:"100vh",
        width:"100vw",
        position:"fixed",
        top:0,
        left:0,

        backgroundImage: `linear-gradient(${colours.secondary} , ${colours.secondary}a0), url(https://e7.pngegg.com/pngimages/924/715/png-transparent-old-vintage-paper-grunge-texture.png)`,
        backgroundSize: "cover",
        backgroundColor: colours.secondary,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) inset, 0 6px 20px 0 rgba(0, 0, 0, 0.19) inset",
        color: colours.txtSecondary,
        ...props.style
    }}  
    >
      <div>
        {props.children}
      </div>
    </div>
  )
}