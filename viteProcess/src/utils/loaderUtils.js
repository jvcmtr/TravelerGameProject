import { innerJointById } from "./utils"
import EventGenerator from "./eventGenerator"

async function getMapData(player){
    const responseE = await fetch('public/connections.json')
    const responseN = await fetch('public/mapNodes.json')
    const dataE = await responseE.json()
    const dataN = await responseN.json()

    var edges = innerJointById(player.travelInfo.discoveredConnections, dataE)
    var nodes = innerJointById(player.travelInfo.discoveredNodes, dataN)

    return {edges: edges, nodes: nodes }
}

async function getEventDataByNode(currentNode){ // current node must have level prop
    var dataEv = getAllEvents()
    let eventGenerator = await getEventGenerator(currentNode)

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
    dataEv = await dataEv 
    let Ev = dataEv.find((e) => {return e.id == eventId} )

    return Ev
}

async function getCombatData(){

}

async function getCurrentNode(player){
    const responseN = await fetch('public/mapNodes.json')
    const dataN = await responseN.json()

    let node = dataN.find((n)=> n.id ==  player.travelInfo.currentlyOn)
    node = innerJointById([node] ,  player.travelInfo.discoveredNodes)[0]
    return node;


}

async function getAllEvents(){
    let responseEv = await fetch('public/events.json') 
    const dataEv = await responseEv.json()
    return dataEv
}

async function getEventGenerator( node ){
    let responseG = await fetch('public/eventsGenerator.json')

    // Init event Generator
    const dataG = await responseG.json()
    let eventG = {}
    dataG.forEach((el)=>{
        if(el.id == node.event_generator){
            eventG = new EventGenerator(el)
        }
    })

    return eventG
}


const loader = {
    getMapData,
    getEventDataByNode,
    getCombatData,
    getCurrentNode,
    getAllEvents,
    getEventGenerator
}
export default loader



// __________________________________ LOCAL _______________________________________________________________________
async function joinCombatData(data){

    return data
}

// _____________________________________ DEPRECATED  __________________________________________________________________
async function getEventData(player){
    console.warn("the use of getEventData( player ) is ineficcient, try using getEventByNode( node ). Be aware that node arg should have \"level\" prop ")
    return getEventDataByNode(getCurrentNode(player))
}