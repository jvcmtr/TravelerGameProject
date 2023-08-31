import React from "react"
import {innerJointById} from '../utils/utils.js'
import eventGenerator from '../classes/eventGenerator'
import colours from '../utils/colours'

import Background from "../components/layout/backgroundArea.jsx";
import BoldText from '../components/text/boldText';
import SimpleText from '../components/text/simpleText.jsx'
import DiamondIcon from "../components/diamondIcon.jsx";
import TextButton from "../components/textButton.jsx";


export default function Event(props){

    const playerNode = React.useRef();
    const eventGen = React.useRef();

    const [loaded, FORCE_RENDER] = React.useState(0)
    const [Event, setEvent] = React.useState(0); 

    React.useLayoutEffect(()=>{
        async function loadData(){   
            const responseN = await fetch('public/mapNodes.json')
            const responseG = await fetch('public/eventsGenerator.json')
            const responseEv = await fetch('public/events.json')

            // Initialize node on witch event ocours
            const dataN = await responseN.json()
            let node = dataN.find((n)=> n.id == props.player.travelInfo.currentlyOn)
            node = innerJointById([node] , props.player.travelInfo.discoveredNodes)[0]
            playerNode.current = node;
            
            // Init event Generator
            const dataG = await responseG.json()
            let eventG = {}
            dataG.forEach((el)=>{
                if(el.id == node.event_generator){
                    eventG = new eventGenerator(el)
                }
            })

            // Find the ID of the current Event
            let eventId = -1
            node.special_events.forEach(element => {
                if(element.ocouring_level == node.level){
                    eventId = element.event_id
                }
            });
            if(eventId == -1){
                eventId = eventG.getRandom().event_id
            }

            // initialize Event
            const dataEv = await responseEv.json()
            let Ev = dataEv.find((e) => {return e.id == eventId} )
         
            setEvent({...Ev})
            props.finishLoading.call(this)
            FORCE_RENDER(loaded+1)
        }
      
        loadData()
    }, [])


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
                    {console.log(playerNode.current)}
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
                            return <TextButton style={{padding: "10px", width:"100%"}}> {option.description} </TextButton>
                        })
                    }
                </div>
        </ div>)}
        { !Event && <h3 style={{color: "#fff"}}> ERROR ON LOADING </h3> }
        </Background>
    )
}