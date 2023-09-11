import React from "react"
import {innerJointById} from '../utils/utils.js'
import eventGenerator from '../classes/eventGenerator'
import SCREENS from '../utils/pages.js'

import ChoiceEvent from "./choiceEvent.jsx"
import Background from "../components/layout/backgroundArea.jsx";


export default function Event({getPlayer, setPlayer, finishLoading, changePage}){

    const player = getPlayer();
    const playerNode = React.useRef();

    const [loaded, FORCE_RENDER] = React.useState(0)
    const [Event, setEvent] = React.useState(0); 
    const eventGenerator = React.useState()
    const eventCounter = React.useRef(0)

    React.useLayoutEffect(()=>{
        async function loadData(){   
            const responseN = await fetch('public/mapNodes.json')

            // Initialize NODE on witch event ocours
            const dataN = await responseN.json()
            let node = dataN.find((n)=> n.id ==  player.travelInfo.currentlyOn)
            node = innerJointById([node] ,  player.travelInfo.discoveredNodes)[0]
            playerNode.current = node;
            
            // Initialize EVENT GENERATOR
            eventGen = await getEventGenerator(node)
            eventGenerator.current = eventGen

            // init EVENT
            let Ev = await InitEvent(node,eventGen)
            eventCounter.current += 1
            setEvent({...Ev})
            
            finishLoading.call(this)
            FORCE_RENDER(loaded+1)
        }
      
        loadData()
    }, [])

    const resolve = (resolveInfo) => {
        if(resolveInfo.name == "CONINUE"){ // default neutral state (keep exploring)
            getNextEvent(eventGenerator, resolveInfo.args)
        }

        if(resolveInfo.name == "RETURN"){ // default losing state
            changePage(SCREENS.MAP) 
        }

        if(resolveInfo.name == "FINISH"){ // default wining state
            let p = player
            p.travelInfo.discoveredNodes.forEach((node,index)=>{
                if(node.id == playerNode.id){
                    p.travelInfo.discoveredNodes[index] += 1
                }
            })
            setPlayer(p)
            changePage(SCREENS.MAP)
        }

        // handle resolve prop from option
        /*
            CONTINUE -> go to next event if amount of events per journey isnt too high(default wining state)
            CONTINUE (to) -> same name but receives an id as args .go to specific event
            RETURN (to map) ->  return to map without increasing the node level
                                OR MAYBE* if its level 1 return to last node (default defeat state)
            FINISH -> return to map increasing the node level AND MAYBE* update player position to current node
        */
    }

    return (
        <Background >
        { (loaded>0) && (
            <ChoiceEvent
                getPlayer={getPlayer}
                setPlayer={setPlayer}
                Event={Event}
                playerNode={playerNode}
                resolve={resolve}
            />
        )}
        { !Event && <h3 style={{color: "#fff"}}> ERROR ON LOADING </h3> }
        </Background>
    )
}


async function getNextEvent(eventGenerator, args){
    let responseEv = await fetch('public/events.json') 
    const dataEv = await responseEv.json()

    let eventId = -1

    if(!args[0]){
        eventId = eventGenerator.getRandom()
    }
    else {
        eventId = args[0]
    }

    return dataEv.find((e) => {return e.id == eventId} )
}

async function InitEvent(currentNode, eventGenerator){
    let responseEv = fetch('public/events.json') 
    let eventGenerator = getEventGenerator(currentNode)

    // Find the ID of the current Event
    let eventId = -1
    currentNode.special_events.forEach(element => {
        if(element.ocouring_level == currentNode.level){
            eventId = element.event_id
        }
    });
    if(eventId == -1){
        eventId = eventGenerator.getRandom().event_id
    }

    // initialize Event
    responseEv = await responseEv
    const dataEv = await responseEv.json()
    let Ev = dataEv.find((e) => {return e.id == eventId} )

    return Ev
}

async function getEventGenerator(currentNode){
    let responseG = fetch('public/eventsGenerator.json')

    // Init event Generator
    responseG = await responseG
    const dataG = await responseG.json()
    let eventG = {}
    dataG.forEach((el)=>{
        if(el.id == currentNode.event_generator){
            eventG = new eventGenerator(el)
        }
    })

    return eventG
}