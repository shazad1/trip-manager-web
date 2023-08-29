import React from "react"
import SelectableItem from "./selectableItem";


export default function PickATruck(props) {

    const fleet = props.fleet;
    const selectedTruck = props.selectedTruck;
    const onSelection = props.onSelection;
    return  (
        <React.Fragment>
            {(fleet || []).map((truck, index) => {
                return (<SelectableItem key={index} ids={{selectedTruck: truck}} selected = {selectedTruck?.regNo == truck.regNo} onSelected = {onSelection}  subHeading1={truck.class} heading={truck.name} subHeading2={truck.status} details={truck.regNo}>

                </SelectableItem>)
               return <div>{truck.name}</div>
            })}
        </React.Fragment>
    )
    
  } 