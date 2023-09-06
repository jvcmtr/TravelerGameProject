import React from "react"
import colours from '../utils/colours'
import SimpleText from '../components/text/simpleText.jsx'

export default function MainText(props){
    return(
        <div style={{
            height: "48%",
            width: "100%"
        }}>
            <SimpleText themeColor={colours.txtSecondary}> {props.event.text} </SimpleText>
        </div>
    )
}