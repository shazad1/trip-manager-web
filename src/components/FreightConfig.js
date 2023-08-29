import React, { useEffect, useState, Image } from 'react';
import background from './../assets/background.png';

import threeaitem from "./../assets/3a-item.png";
import threebitem from "./../assets/3b-item.png";
import twoaitem from "./../assets/2a-item.png";
import twobitem from "./../assets/2b-item.png";
import oneaitem from "./../assets/1a-item.png";
import onebitem from "./../assets/1b-item.png";
import SelectableItem from './selectableItem';
import { HdrOnSelectRounded } from '@mui/icons-material';

export default function FreightConfig(props) {

    const [currentSelection, setCurrentSelection] = React.useState({

        number: props.selectedNumberOfThings,
        index: props.selectedConfigType
    });


    function onSelectionChange(ids, value) {

        if (value) {
            let crntSel = {};
            crntSel.number = ids.number;
            crntSel.index = ids.index;

            setCurrentSelection(crntSel);
            props.onConfigSet(ids.number, ids.index);
        } else {
            setCurrentSelection({});
        }

    }

    return (
        ([1, 1, 2, 2, 3, 3].map((number, index) => {
            return (
                <div>

                    <div>
                        {number == 1 ? number + " Item like this " : number + " Items like this"}
                    </div>
                    {(number == 3 && index == 4) ? (<SelectableItem key={index}   ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange}  image={threeaitem} ></SelectableItem>) : null}
                    {(number == 3 && index == 5) ? (<SelectableItem key={index}   ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange}  image={threebitem} ></SelectableItem>) : null}

                    {(number == 1 && index == 0) ? (<SelectableItem key={index} ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange} image={oneaitem}></SelectableItem>) : null}

                    {(number == 1 && index == 1) ? (<SelectableItem key={index}   ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange} image={onebitem}></SelectableItem>) : null}

                    {(number == 2 && index == 2) ? (<SelectableItem key={index}   ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange} image={twoaitem}></SelectableItem>) : null}

                    {(number == 2 && index == 3) ? (<SelectableItem key={index}   ids = {{number:number, index:index}} selected = {currentSelection.number == number && currentSelection.index == index} onSelected = {onSelectionChange} image={twobitem}></SelectableItem>) : null}


                </div>
            )
        })))
}


