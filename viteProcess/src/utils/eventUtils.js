// Executes the outcome of a combat OR a chosen option
    export function executeOption(playerState, option){
        let nplayer = playerState;

        for(let i=0; i < option.action.methods.length ; i++){
            try{
                nplayer = eval(`${option.action.methods[i].name}( ${JSON.stringify(playerState)} , ${JSON.stringify(option.action.methods[i].args)})`);
            }catch{
                continue;
            }

            if(nplayer){
                playerState = nplayer;
            }
        }
        return playerState;
    }
//



// checks whether an option is fit to be chosen by the player
    export function isPossible(playerState, option){

        if(option.possible == undefined) {return true}

        let r = eval(`${option.possible.method}( ${JSON.stringify(playerState)} , ${JSON.stringify(option.possible.args)} )`);

        if(r == undefined){
            console.warn(` unable to resolve ${option.possible.method}( player , ${option.possible.args} ). \n method doesnt Exist `)
        }
        return r;
    }
//


// _________________________________________________ POSSIBLE
function PlayerHasKey(player, args){
    let r = true
    args.forEach(element => {
        if(! player.inventory.keys.includes(element)){
            r = false
        }
    });
    return r
}

function PlayerHas(player, args){
    console.warn(" NOT IMPLEMENTED ")
    return true
}

function PlayerHasQuest(player, args){

    return player.questMarkers.includes(args[0])
}




//  _________________________________________________ ACTION
function playerQuestAdd(player, args){

    if(args[0]){
        player.questMarkers.push(args[0])
    }
    return player
}

function playerDiscoverConnection(player, args){
    if(args[0]){
        player.travelInfo.discoveredConnections.push(args[0])
    }
    return player
}

function changePlayerLocation(player, args){
    if(args[0]){
        player.travelInfo.currentlyOn = args[0]
    }
    return player
}



