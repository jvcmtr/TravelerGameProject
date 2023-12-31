import Area from '../components/layout/area'
import DiamondIcon from '../components/diamondIcon'
import Title from '../components/text/titleText'
import Text from '../components/text/simpleText'
import TextButton from '../components/textButton'

import React from 'react'

export default function SideDescription(props){
  const [active, setActive] = React.useState(true)
  const [hover, setHover] = React.useState(false)

  const TravelButtonRef = React.useRef()
  const travelAllowed = props.travelAllowedFor.includes(props.node.id)
  
  const Width = 27
  var translate = 0;
  if(!active){
    translate = (Width - 1) + 'vw'
  }
  if(hover && !active){
    translate = (Width - 2) + 'vw'
  }

  React.useEffect(()=>{
    setActive(props.active)
    TravelButtonRef.current.focus()
  },[props.active])
  
  const handleKey = (e) =>{
    if(e.key == "Enter" && travelAllowed){
      props.travelTo.call(this, props.node); 
      e.stopPropagation() 
    }
  }

  
  return(
    <Area
      onClick={()=>{setActive(true)}}
      onMouseEnter={()=>{setHover(true) }}
      onMouseLeave={()=>{setHover(false)}}
      style={{    
        position: 'fixed',
        zIndex: 5,
        top:0,
        right:'0px',
        height:'100vh',
        width: Width + 'vw',
        transform: `translateX(${translate})`,
        transitionDuration: '0.5s'
      }}
    >
      <div 
        style={AreaStyle}>

        <div style={{alignSelf: 'end'}}>
          <TextButton onClick={(e)=>{ 
            console.log(e); 
            setActive(false); 
            e.stopPropagation()} }>
            X
          </TextButton>
        </div>
        
        <Title> {props.node.name} </Title>

        <div style={{
            display:'flex', 
            flexDirection:"row", 
            justifyContent:"space-eevenly", 
            marginTop:'30px'
          }}>
          <DiamondIcon>
            {props.node.symbol}
          </DiamondIcon>
          {props.node.concluded &&(<Text><i>cleared</i></Text>)}
        </div>
        
        {
          // IMAGEM DO PONTO DE INTERESSE
        }
        
        <Text> {props.node.description} </Text>

        <div 
          style={{marginTop: '30px'}} 
          ref={TravelButtonRef}
          tabIndex={0}
          onKeyDown={handleKey} 
        >
          <TextButton 
            disable={!travelAllowed}
            onClick={(e)=>{
              props.travelTo.call(this, props.node); 
              e.stopPropagation()} 
          }>
            {
              (props.node.id == props.travelAllowedFor[0]) ? "Investigar " : "Viajar para : "
            }
            {props.node.name}
          </TextButton>
        </div>
        
        <Text><i>Level: {props.node.level}</i></Text>
        
      </div>
    </Area>
  )
}

const AreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    margin: '10px',
    height: '90vh'
}