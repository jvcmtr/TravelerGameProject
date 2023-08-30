import React from 'react'
import colours from '../../utils/colours'

export default function Area(props){
  return(
    <div 
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
      style={{
        height:"100%",
        width:"100%",
        backgroundImage: `linear-gradient(${colours.primary}a0, ${colours.primary}a0), url(https://e7.pngegg.com/pngimages/924/715/png-transparent-old-vintage-paper-grunge-texture.png)`,
        backgroundSize: "cover",
        backgroundColor: colours.primary,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        color: colours.txtPrimary,
        ...props.style
    }}  
    >
      <div>
        {props.children}
      </div>
    </div>
  )
}