import Area from '../components/layout/area'
import DiamondIcon from '../components/diamondIcon'
import Title from '../components/text/titleText'
import Text from '../components/text/simpleText'
import TextButton from '../components/textButton'
import React from 'react'

export default function SideDescription(props){
  const [active, setActive] = React.useState(true)
  const [hover, setHover] = React.useState(false)

  let node = props.node
  const TravelButtonRef = React.useRef()
  const travelAllowed = props.travelAllowedFor.includes(node.id)
  
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
      props.travelTo.call(this, node); 
      e.stopPropagation() 
    }
  }

  
  return(
    <Area
      onClick={()=>{setActive(true)}}
      onMouseEnter={()=>{setHover(true)}}
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
        
        <Title> {node.name} </Title>
        
        <div style={{
            display:'flex', 
            flexDirection:"row", 
            justifyContent:"space-eevenly", 
            marginTop:'20px'
          }}>
          <DiamondIcon>
            {node.symbol}
          </DiamondIcon>
          {node.concluded &&(<Text><i>cleared</i></Text>)}
        </div>
        
        {
          // IMAGEM DO PONTO DE INTERESSE
        }
        
        <Text> {node.description} </Text>

        <div 
          style={{marginTop: '30px'}} 
          ref={TravelButtonRef}
          tabIndex={0}
          onKeyDown={handleKey} 
        >
          <TextButton 
            disable={!travelAllowed}
            onClick={(e)=>{
              props.travelTo.call(this, node); 
              e.stopPropagation()} 
          }>
            {
              (node.id == props.travelAllowedFor[0]) ? "Adentrar" : "Viajar para : "
            }
            {props.node.name}
          </TextButton>
        </div>
        
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