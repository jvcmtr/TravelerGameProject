const rules = {
    MAX_EXPLORATION_DEPTH : 20,
    TARGET_EVENT_BY_DEPTH : (depth)=>{
        return Math.floor(depth/5) + 3
    }
}

export default rules