import colours from '../constants/colours'

export default function DiamondIcon(props){
  return(
    <div style={{
        height :'30px', 
        width : '30px',
        
        borderColor: colours.helper,
        borderWidth: "3px",
        borderStyle: "dashed",
        
        transform : 'translate(-17px, -17px) rotate(45deg)',
        backgroundColor: colours.secondary,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        ...props.style
        }}
      >
      
      <div style={{
        height :'30px', 
        width : '30px',
        
        position: 'relative',
        top: '-2px',
        left: '-2px',
        
        color: colours.txtSecondary,
        fontSize: '25px',
        textAlign: 'center',
        
        transform : `rotate(-45deg)`,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}