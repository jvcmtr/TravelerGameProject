    // Executes the outcome of a combat OR a chosen option
export function executeOption(playerState, setPlayerState, option){
    let player = playerState;
    player = eval(`${option.action.method}( ${JSON.stringify(playerState)} , ${JSON.stringify(option.action.args)})`);
    setPlayerState({...player})
}

    // checks whether an option is fit to be chosen by the player
export function isPossible(playerState, option){

    if(option.possible == undefined) {return true}

    let r = eval(`${option.possible.method}( ${JSON.stringify(playerState)} , ${JSON.stringify(option.possible.args)} )`);

    console.log(r)
    if(r == undefined){
        console.warn(` unable to resolve ${option.possible.method}( player , ${option.possible.args} ). \n method doesnt Exist `)
    }
    return r;
}





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



