import theme from '../../utils/colours.js';
import styled from "styled-components";

  const Txt = styled.div`
  font-weight: 400;
  font-size: 0.8rem ;

  max-width: 100%;
  word-wrap: break-word;


  @media(min-width: 1200px){
    font-size: 0.9rem ; }

  @media(max-width: 600px){
    font-size: 0.8rem ; }
    
  @media(max-width: 420px){
    font-size: 0.75rem ; }

`

export default function TitleText(props){
  let c = theme.txtPrimary;
  
  if (props.themeColor != undefined){
    c = props.themeColor
  }

  return ( 
    <Txt style={{ color: c}}>
      {props.children}
    </Txt> 
  )
}