
class combatEnv{

    
    constructor(){
        this.registered = []
        

    } 

    registerForUpdate(callbackMethod){
        this.registered.push(callbackMethod)
    }

    update(){
        this.registered.forEach((method)=>{
            method.call(this, this)
        })
    }
}