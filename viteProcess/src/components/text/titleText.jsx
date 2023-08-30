import theme from '../../utils/colours.js';
import styled from "styled-components";

  const Txt = styled.div`
    font-weight: 600;
    font-size:1.5rem;

    max-width: 100%;
    word-wrap: break-word;

  @media(min-width: 1200px){
    font-size: 1.7rem ; }

  @media(max-width: 600px){
    font-size: 1.6rem ; }
    
  @media(max-width: 420px){
    font-size: 1.4rem ; }

  @media(max-width: 350px){
  font-size: 1.0rem ; }

`

export default function bigText(props){
  let color = theme.txtPrimary;
  
  if (props.themeColor !== undefined){
    color = props.themeColor
  }

  return ( 
    <Txt style={{color: color }}> 
      {props.children}
    </Txt> 
  )
}