
export default class EventGenerator {
    constructor(obj){
        this.id  = obj.id;
        this.events = obj.events;
    }

    getRandom(){
        weigthtedEvents = []
        this.events.forEach(ev => {
            for (let i = 0; i < ev.chance ; i++) {
                weigthtedEvents.push(ev)
            }
        });

        i = Math.random() * weigthtedEvents.length;
        return weigthtedEvents[i]
    }
}