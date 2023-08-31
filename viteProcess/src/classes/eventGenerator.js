
import React from "react";

export default class EventGenerator extends React.Component {
    constructor(obj){
        super(obj)
        this.state = {...obj};
    }

    getRandom(obj){
        let weigthtedEvents = []
        this.state.events.forEach(ev => {
            for (let i = 0; i < ev.chance ; i++) {
                weigthtedEvents.push(ev)
            }
        });

        let i = Math.floor( Math.random() * weigthtedEvents.length) ;
        return weigthtedEvents[i]
    }
}