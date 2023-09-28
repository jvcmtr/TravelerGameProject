import React from "react"
import Background from "../components/layout/backgroundArea.jsx";
import Area from "../components/layout/area.jsx";

export default function CombatEvent({getPlayer, setPlayer, Event, playerNode, resolve}){

    const GetCombatInfo = () =>{
        return(
            <Area style={{margin: "50px", padding:"50px", width:"70vw", alignItems:"center"}}>
                {Object.keys(Event).map((key) => {
                    return (
                        <div> <b>{key} : </b> {Event[key]} </div>
                    );
                })}
            </Area>
        )
    }

    React.useEffect(()=>{
        async function load(){
            const responseE = await fetch('public/enemies.json')
            const responseA = await fetch('public/actions.json')
            const responseW = await fetch('public/weapons.json')
            const responseI = await fetch('public/items.json')
            const

            dataE = await responseE.json()
        }

        load()
    })

    return(
        <Background>
            <h3 style={{color: "#fff"}}> COMBAT PAGE NOT IMPLEMENTED </h3>
            <GetCombatInfo/>
        </Background>
    )
}