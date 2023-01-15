import React from "react";
import {Add,Remove} from '@material-ui/icons';




const Counter = (props)=>{
    const quantityLimit= props.count < props.quantity

    
    return(
            <div>
                <span className="counter mb-3"><button className="counter-button" onClick={()=>{props.decrement(props.count)}}><Remove /></button><span style={{padding:6}}> {props.count} </span>{quantityLimit?(<button className="counter-button" onClick={()=> {props.increment(props.count)}}> <Add /> </button>):(<button style={{borderRadius:4,backgroundColor:'grey'}} disabled><Add /></button>)}<span> ({props.count} items(s) added) </span></span>
            </div>
        )
    }


export default Counter;