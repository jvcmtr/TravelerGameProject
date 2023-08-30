import React from 'react'
import colours from '../utils/colours'
import Text from './text/simpleText'

export default function TextButton(props){

  const [hover, setHover] = React.useState(false)

  const handleClick = (e)=>{
    if(props.disable){
      return
    }
    props.onClick.call(this, e)
  }
  
  return(
    <div 
      onClick={handleClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        padding: '3px',
        paddingLeft: '6px',
        paddingRight: '6px',
        
        borderRadius:'5px',
        outlineColor: colours.secondary,
        outlineWidth: "1px",
        
        userSelect: 'none',

        transitionDuration: '0.2s',
        filter: hover? "brightness(1.5)" : "", 
        backgroundColor: props.disable? colours.helper : colours.action,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    }}  
    >
      <Text themeColor={colours.txtSecondary}>
        {props.children}
      </Text>
    </div>
  )
}