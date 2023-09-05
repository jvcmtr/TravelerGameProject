import React from "react"
import {innerJointById} from '../utils/utils.js'
import {isPossible, executeOption} from '../utils/eventUtils.js'
import eventGenerator from '../classes/eventGenerator'
import colours from '../utils/colours'
import SCREENS from '../utils/pages.js'

import Background from "../components/layout/backgroundArea.jsx";
import BoldText from '../components/text/boldText';
import SimpleText from '../components/text/simpleText.jsx'
import DiamondIcon from "../components/diamondIcon.jsx";
import TextButton from "../components/textButton.jsx";


export default function Event({player, setPlayer, finishLoading, changePage}){

    const playerNode = React.useRef();
    const eventGen = React.useRef();

    const [loaded, FORCE_RENDER] = React.useState(0)
    const [Event, setEvent] = React.useState(0); 

    React.useLayoutEffect(()=>{
        async function loadData(){   
            const responseN = await fetch('public/mapNodes.json')

            // Initialize node on witch event ocours
            const dataN = await responseN.json()
            let node = dataN.find((n)=> n.id ==  player.travelInfo.currentlyOn)
            node = innerJointById([node] ,  player.travelInfo.discoveredNodes)[0]
            playerNode.current = node;
            
            let Ev = await InitEventPipeline(node)
            setEvent({...Ev})
            
             finishLoading.call(this)
            FORCE_RENDER(loaded+1)
        }
      
        loadData()
    }, [])


    const handleClick = (option) =>{
        let p = executeOption( player, option)
        if(!p){
            console.warn("ERROR HANDLING OPTION. eventUtils executeOption() returned " + p)
            console.warn(p)
        }
        
        console.warn("handlingClick runing on Event.jsx ln:51")
        setPlayer({...p})

        changePage(SCREENS.MAP)
        // FORCE
        

        // handle resolve prop from option
        /*
            CONTINUE -> go to next node (default wining state)
            CONTINUE TO -> go to specific node
            RETURN TO MAP ->  return to map without increasing the node level
                                OR MAYBE* if its level 1 return to last node (default defeat state)
            END LEVEL -> return to map increasing the node level AND MAYBE* update player position to current node
        */
    }

    return (
        <Background >
        { (loaded>0) && (
            <div style={{
                height: "90vh",
                padding: "5%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "start" 
            }}>
                <div style={{
                    width: "100%",
                    height: "12%",  
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "5px"
                }}>
                    <SimpleText themeColor={colours.txtSecondary}>  {playerNode.current.name} </SimpleText>
                    <SimpleText themeColor={colours.txtSecondary}> {"   ♦   "}  </SimpleText>
                    <BoldText themeColor={colours.txtSecondary}>  {playerNode.current.level} </BoldText>
                </div>

                <div style={{
                    height: "48%"
                }}>
                    <SimpleText themeColor={colours.txtSecondary}> {Event.text} </SimpleText>
                </div>
 
                <div style={{
                    height: "35%" ,
                    marginBottom: "5%",
                    gap: "10%",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {
                        Event.options.map((option)=>{
                            if(isPossible( player, option)){
                                return (
                                <TextButton 
                                    style={{padding: "10px", width:"100%"}} 
                                    onClick={()=>handleClick(option)}> 
                                        {option.description} 
                                </TextButton>)
                            }
                        })
                    }
                </div>
        </ div>)}
        { !Event && <h3 style={{color: "#fff"}}> ERROR ON LOADING </h3> }
        </Background>
    )
}


async function InitEventPipeline(currentNode){
    let responseG = fetch('public/eventsGenerator.json')
    let responseEv = fetch('public/events.json') 

    // Init event Generator
    responseG = await responseG
    const dataG = await responseG.json()
    let eventG = {}
    dataG.forEach((el)=>{
        if(el.id == currentNode.event_generator){
            eventG = new eventGenerator(el)
        }
    })

    // Find the ID of the current Event
    let eventId = -1
    currentNode.special_events.forEach(element => {
        if(element.ocouring_level == currentNode.level){
            eventId = element.event_id
        }
    });
    if(eventId == -1){
        eventId = eventG.getRandom().event_id
    }

    // initialize Event
    responseEv = await responseEv
    const dataEv = await responseEv.json()
    let Ev = dataEv.find((e) => {return e.id == eventId} )

    return Ev
}