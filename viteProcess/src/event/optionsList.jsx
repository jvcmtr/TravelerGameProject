import React from "react"
import TextButton from "../components/textButton.jsx" 

export default function OptionsList(props){
    return(
        <div style={{
            height: "min(0, 35%)" ,
            width: "100%",
            padding: "5%",
            marginBottom: "5%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridColumnGap: "5%",
            gridRowGap: "20%",
        }}>
            {
                props.options.map((option, index)=>{
                    if(props.checkPossible(option)){
                        return (
                        <TextButton 
                            key={"OPTION"+index}
                            style={{padding: "10px", width:"100%"}} 
                            onClick={() => props.handle(option)}> 
                                {option.description} 
                        </TextButton>)
                    }
                })
            }
        </div>
    )
}