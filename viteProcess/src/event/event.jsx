import React from "react"
import {innerJointById} from '../utils/utils.js'
import eventGenerator from '../classes/eventGenerator'


export default function Event(props){

    const playerNode = React.useRef();
    const eventGen = React.useRef();
    const [Event, setEvent] = React.useState();

    React.useEffect(()=>{
        async function loadData(){   
            const responseN = await fetch('public/mapNodes.json')
            const responseG = await fetch('public/eventsGenerator.json')
            const responseEv = await fetch('public/events.json')

            // Initialize node on witch event ocours
            const dataN = await responseN.json()
            let node = dataN.find((n)=>{
              if (n.id == player.travelInfo.currentlyOn){
                node = innerJointById([node] , player.travelInfo.discoveredNodes)
              }
            })
            playerNode.current = node;
            

            // Init event Generator
            const dataG = await responseG.json()
            eventGen.current = new eventGenerator(dataG)

            // Find the ID of the current Event
            let eventId = -1
            node.special_events.forEach(element => {
                if(element.ocouring_level == node.level){
                    eventId = element.event_id
                }
            });
            if(eventId == -1){
                eventId = eventGen.current.getRandom()
            }

            // initialize Event
            const dataEv = await responseEv.json()
            let Ev = dataEv.find((e) => e.id == eventId)
            setEvent(Ev)

            props.finishLoading.call(this)
        }
      
        loadData()
    }, [])


    return <h5> NOT IMPLEMENTED </h5>
}