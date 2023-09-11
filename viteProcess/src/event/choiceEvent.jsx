import React from "react"
import {isPossible, executeOption} from '../utils/eventUtils.js'

import OptionsList from "./optionsList.jsx";
import Header from "./header.jsx" 
import MainText from "./mainText.jsx"


export default function ChoiceEvent({getPlayer, setPlayer, Event, playerNode, resolve}){

    const player = getPlayer();

    const handleClick = (option) =>{
        let p = executeOption( player, option)
        if(!p){
            console.warn("ERROR HANDLING OPTION. eventUtils executeOption() returned " + p)
            console.warn(p)
        }
        setPlayer({...p})

        resolve(option.resolve)
    }

    const checkPossible = (args) => isPossible(player, args)

    return (
        <div style={{
            height: "90vh",
            padding: "5%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "start" 
        }}>
                <Header 
                 node={playerNode.current} 
                 event={Event}/>

                <MainText event={Event}/>

                <OptionsList 
                 options={Event.options} 
                 handle={handleClick} 
                 checkPossible={checkPossible}/>

        </ div>
    )
}