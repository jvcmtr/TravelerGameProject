import React from "react"
import colours from '../utils/colours'
import BoldText from '../components/text/boldText';
import SimpleText from '../components/text/simpleText.jsx';

export default function ChoiceEventHeader(props){
    
    return(
        <div style={{
            width: "100%",
            height: "12%",  
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            gap: "5px"
        }}>
            <SimpleText themeColor={colours.txtSecondary}>  {props.node.name} </SimpleText>
            <SimpleText themeColor={colours.txtSecondary}> {"   ♦   "}  </SimpleText>
            <BoldText themeColor={colours.txtSecondary}>  {props.node.level} </BoldText>
        </div>
    )
}