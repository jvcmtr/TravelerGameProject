import React from 'react'
import colours from '../constants/colours'

//  CONTROLE /////////////////////////////////////////////
const LarguraDaLinha = 4;
const CorDaLinha = "#000"
const Opacidade = 1;
const Pontilhado = true;
const ComprimentoDoPontilhado = 12;
const EspacoEntreOsPontos = 8



export default function MyCanvas(props){
  const canvasRef = React.useRef()
  const nodes = props.data.nodes
  const paths = props.data.paths

  const [MapImg, setMapImg] = React.useState({width:10, height:100})

  React.useEffect( () => { 
    setMapImg(document.querySelector('#mapImg'))
  }, [] )

  React.useEffect(()=>{
    canvasRef.current.width = MapImg.width;
    canvasRef.current.height = MapImg.height;
    draw()
  }, [MapImg])
  
  function draw(){
    var context  = canvasRef.current.getContext('2d')

    context.lineWidth = LarguraDaLinha;
    context.strokeOpacity = Opacidade
    context.strokeColor = CorDaLinha
    if (Pontilhado){
     context.setLineDash([ComprimentoDoPontilhado, EspacoEntreOsPontos]) 
    }
    
    paths.forEach(path => {
      let points = findPathPositions(path, nodes)
      context.beginPath() 
      context.strokeStyle = colours.secondary
      context.moveTo( points[0].x , points[0].y )
      context.lineTo( points[1].x, points[1].y )
      context.stroke()
    })
  }

  return (
    <canvas 
      style={{
        position: "absolute",
        width: MapImg.width + "px",
        height: MapImg.height + "px",
        top: 0,
        left: 0,        
        zIndex: 1,
        imageRendering: 'pixelated',
        overflow:'hidden',
        pointerEvents: "none"
      }} 
      ref={canvasRef} 
  />)
}

function findPathPositions(path, nodes){

  let posA = {x:0,y:0}
  let posB = {x:0,y:0}
  nodes.forEach(node=>{
    if (node.id == path.node_a){
      posA = node.position
    }

    if (node.id == path.node_b){
      posB = node.position
    }
  })
  
  return [ posA,  posB]
}



/*
CANVAS SEMPRE DO TAMANHO DA TELA
  React.useEffect( () => { 
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    
  }, [] )

  
  function resizeCanvas() {
    console.log(window.scrollHeight)
    canvasRef.current.width = window.scrollWidth;
    canvasRef.current.height = window.scrollHeight;
    draw(); 
  }
*/