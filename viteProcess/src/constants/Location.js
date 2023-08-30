
// unfinished


class pointOfIntrest {
    constructor(obj){
        this.prop = {...obj}
        async function init(){
            const responseG = await fetch('public/eventsGenerator.json')
            this.props.event_generator = await responseG.json
        }

        init()
    }

    getEvent(Level){
    }

}