// Executes the outcome of a combat OR a chosen option
    export function executeOption(playerState, option){
        let player = playerState;

        for(i=0; i<option.action.methods.length ; i++){
            let nplayer = eval(`${option.action.methods[i].name}( ${JSON.stringify(playerState)} , ${JSON.stringify(option.action.methods[i].args)})`);
            if(nplayer){
                player = nplayer;
            }
        }

        return player;
    }
//





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



