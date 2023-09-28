import React from "react"
import {innerJointById} from '../utils/utils.js'
import RULES from "../utils/RulesConfig.js"
import loader from '../utils/loaderUtils.js'
import eventGenerator from '../utils/eventGenerator.js'
import SCREENS from '../utils/pages.js'

import ChoiceEvent from "./choiceEvent.jsx"
import CombatEvent from "../combat/CombatEvent.jsx"
import Background from "../components/layout/backgroundArea.jsx";


export default function Event({getPlayer, setPlayer, finishLoading, changePage}){

    const player = getPlayer();
    const playerNode = React.useRef();

    const [loaded, FORCE_RENDER] = React.useState(0)
    const [Event, setEvent] = React.useState(0); 
    const eventCounter = React.useRef(0)

    React.useEffect(()=>{
        async function loadData(){   
            let node = await loader.getCurrentNode(player)
            playerNode.current = node

            let Ev = await loader.getEventDataByNode(node)
            eventCounter.current += 1
            setEvent({...Ev})
            
            finishLoading.call(this)
            FORCE_RENDER(loaded+1)
        }
      
        loadData()
    }, [])

    const resolve = async (resolveInfo) => {
        if(resolveInfo.name == "CONTINUE"){ // default neutral state
            if(eventCounter.current <= RULES.TARGET_EVENT_BY_DEPTH(playerNode.current.level) ){
                eventCounter.current += 1
                let eventGen = await loader.getEventGenerator(playerNode.current)
                let Ev = await getNextEvent(resolveInfo.args,eventGen)
                setEvent(Ev)
            }
            else{
                resolveInfo.name = "FINISH"
            }
        }

        if(resolveInfo.name == "CONTINUE_TO"){ // neutral state (force new event)
            eventCounter.current += 1
            let eventGen = await loader.getEventGenerator(playerNode.current)
            let Ev = await getNextEvent(resolveInfo.args , eventGen )
            setEvent(Ev)
        }

        if(resolveInfo.name == "RETURN"){ // default losing state
            changePage(SCREENS.MAP) 
        }

        if(resolveInfo.name == "FINISH"){ // default wining state
            let p = player

            // Increment Level
            p.travelInfo.discoveredNodes.forEach((node,index)=>{
                if(node.id == playerNode.current.id){
                    let _id = p.travelInfo.discoveredNodes[index].id
                    let _level = p.travelInfo.discoveredNodes[index].level
                    if(_level <= RULES.MAX_EXPLORATION_DEPTH){
                        p.travelInfo.discoveredNodes[index].level += 1
                    }
                }
            })

            setPlayer(p)
            changePage(SCREENS.MAP)
        }
    }

    return (
        <Background >
        { (loaded>0) && (Event.type == "choice") && (
            <ChoiceEvent
                getPlayer={getPlayer}
                setPlayer={setPlayer}
                Event={Event}
                playerNode={playerNode}
                resolve={resolve}
            />
        )}

        { (loaded>0) && (Event.type == "combat") && (
            <CombatEvent
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


async function getNextEvent(args , eventGen){
    const dataEv = await loader.getAllEvents()
    let eventId = -1

    if(!args[0]){    
        eventId = eventGen.getRandom().event_id
    }
    else {
        eventId = args[0]
    }

    let Ev = dataEv.find((e) => {return e.id == eventId} )

    if(Ev.type == "combat"){
        if(args[1]){
            Ev.case_win = args[1]
        }
        if(args[2]){
            Ev.case_lose = args[2]
        }
    }
    return Ev
}