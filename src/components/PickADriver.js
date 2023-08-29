import React from "react"
import SelectableItem from "./selectableItem";


export default function PickADriver(props) {

    const drivers = props.drivers;
    const selectedDriver = props.selectedDriver;
    const onSelection = props.onSelection;
    return  (
        <React.Fragment>
            {(drivers || []).map((driver, index) => {
                return (<SelectableItem onSelected = {onSelection} ids={{selectedDriver: driver}} key={index} selected = {selectedDriver?.initials == driver.initials}  subHeading1={driver.mobile} heading={driver.name} subHeading2={driver.email} details={"PIN: "+driver.pin}>

                </SelectableItem>)
            })}
        </React.Fragment>
    )
    
  } 