import React from "react"
import {innerJointById} from '../utils/utils.js'
import eventGenerator from '../classes/eventGenerator'
import colours from '../utils/colours'

import Background from "../components/layout/backgroundArea.jsx";
import TitleText from '../components/text/titleText';
import SimpleText from '../components/text/simpleText.jsx'
import DiamondIcon from "../components/diamondIcon.jsx";
import TextButton from "../components/textButton.jsx";


export default function Event(props){

    const playerNode = React.useRef();
    const eventGen = React.useRef();

    const [Event, setEvent] = React.useState(0); 

    React.useEffect(()=>{
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

            setEvent(Ev)
            props.finishLoading.call(this)
        }
      
        loadData()
    }, [])


    return (
        <Background >
        {Event&& (
            <div style={{
                height: "100vh",
                padding: "5%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "start" 
            }}>
                <DiamondIcon>{playerNode.current.symbol} </DiamondIcon>
                <TitleText themeColor={colours.txtSecondary}>  {playerNode.current.name} </TitleText>
                <div style={{height: "50px"}}> </div>
                <SimpleText themeColor={colours.txtSecondary}> {Event.text} </SimpleText>
                <div style={{
                    flexGrow: 3 ,
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {
                        Event.options.map((option)=>{
                            return <TextButton> {option.description} </TextButton>
                        })
                    }
                    {console.log(Event.options)}
                </div>
        </ div>)}
        { !Event && <h3 style={{color: "#fff"}}> ERROR ON LOADING </h3> }
        </Background>
    )
}