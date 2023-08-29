import React, { useEffect, useState } from 'react';
import firebase from "./../Backend/firebase";
import twobtwo from './../assets/twobtwo.png';
import twobone from './../assets/twobone.png';
import twoaone from './../assets/twoaone.png';
import twoatwo from './../assets/twoatwo.png';

import threeaone from './../assets/threeaone.png';
import threeatwo from './../assets/threeatwo.png';
import threeathree from './../assets/threeathree.png';

import threebone from './../assets/threebone.png';
import threebtwo from './../assets/threebtwo.png';
import threebthree from './../assets/threebthree.png';

import oneaone from './../assets/oneaone.png';
import onebone from './../assets/onebone.png';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { orange } from '@mui/material/colors';


export default function FreightLoad(props) {

    let numberOfThings = props.numberOfThings;
    let initialSelectedThings = props.selectedThings;
    let configType = props.configType;
    let things = props.things;
    let clients = props.clients;
    let locations = props.locations;
    let onThingsSelection = props.onThingsSelection;

    const textFieldRef0 = React.useRef(null);
    const textFieldRef1 = React.useRef(null);
    const textFieldRef2 = React.useRef(null);

    const [pickUp, setPickUp] = useState("");
    const [dropOff, setDropOff] = useState("");
    const [currentInYardItems, setCurrentInYardItems] = useState([])

    const [thingsToCarry, setThingsToCarry] = React.useState(

        initializeThingsToCarry()

    );




    function getimgForThing(number) {
        if (numberOfThings == 1 && configType == 0)
            return oneaone;
        if (numberOfThings == 1 && configType == 1)
            return onebone;

        if (numberOfThings == 3 && number == 1 && configType == 4)
            return threeaone;
        if (numberOfThings == 3 && number == 2 && configType == 4)
            return threeatwo;
        if (numberOfThings == 3 && number == 3 && configType == 4)
            return threeathree;

        if (numberOfThings == 3 && number == 1 && configType == 5)
            return threebone;
        if (numberOfThings == 3 && number == 2 && configType == 5)
            return threebtwo;
        if (numberOfThings == 3 && number == 3 && configType == 5)
            return threebthree;

        if (numberOfThings == 2 && configType == 2 && number == 1)
            return twoaone;
        if (numberOfThings == 2 && configType == 2 && number == 2)
            return twoatwo;

        if (numberOfThings == 2 && configType == 3 && number == 1)
            return twobone;
        if (numberOfThings == 2 && configType == 3 && number == 2)
            return twobtwo;


    }

    function fetchInYardAssets(client) {
        firebase.database.ref("1/inyard/" + client.pin)
            .on('value', snapshot => {
                let inYard = snapshot.val();
                
                if (inYard) {
                    inYard = Object.values(inYard);
                    setCurrentInYardItems(inYard);
                }



            })

    }
    function initializeThingsToCarry() {
        let newThingsToCarry = [];
        for (let a = 0; a < numberOfThings; a++) {

            if (initialSelectedThings && initialSelectedThings[a]) {
                newThingsToCarry.push({
                    itemNumber: a + 1,
                    type: initialSelectedThings[a].type,
                    pickup: initialSelectedThings[a].pickup,
                    dropoff: initialSelectedThings[a].dropoff,
                    client: initialSelectedThings[a].client,
                    clientPin: initialSelectedThings[a].clientPin,
                    chasis: initialSelectedThings[a].chasis,
                });
            } else {
                newThingsToCarry.push({
                    itemNumber: a + 1,
                    type: null,
                    pickup: null,
                    dropoff: null,
                    client: null,
                    clientPin: null,
                    chasis: null
                });
            }

        }

        return newThingsToCarry;
    }





    function handleAssetStateChange(itemNumber, selectionName, selectionValue) {
        let newThingsToCarry = thingsToCarry.map((t2c, index) => {

            if (t2c.itemNumber == itemNumber) {



                if (selectionName == 'client') {
                    t2c['clientPin'] = selectionValue.pin;
                }

                t2c[selectionName] = selectionValue.name;

            }
            return t2c;


        });
        setThingsToCarry(newThingsToCarry);

        onThingsSelection(newThingsToCarry);

        console.log(thingsToCarry);
    }

    function handleTripStateChange(selectionName, selectionValue) {
        let newThingsToCarry = thingsToCarry.map((t2c, index) => {

            if (selectionName == 'client') {
                t2c['clientPin'] = selectionValue.pin;
            }

            t2c[selectionName] = selectionValue.name;


            return t2c;


        });
        setThingsToCarry(newThingsToCarry);

        onThingsSelection(newThingsToCarry);

        console.log(thingsToCarry);
    }



    return (<div>
        <div style={cssStyles.hiMsg}>

            <div style={cssStyles.punch}>Pickup Point of the trip </div>
            <div style={cssStyles.options}>

                {locations?.map((location) => {
                    return (
                        <Button style={pickUp == location ? cssStyles.goButtonSelected : cssStyles.goButton}
                            onClick={() => {
                                setPickUp(location)
                                handleTripStateChange('pickup', location)
                            }

                            }>
                            <div>
                                {location.name}
                            </div>
                        </Button>

                    )
                })}
            </div>
        </div>

        <div style={cssStyles.hiMsg}>

            <div style={cssStyles.punch}>Dropoff Point of the trip </div>
            <div style={cssStyles.options}>

                {locations?.map((location) => {
                    return (
                        <Button style={dropOff == location ? cssStyles.goButtonSelected : cssStyles.goButton}
                            onClick={() => {
                                setDropOff(location)
                                handleTripStateChange('dropoff', location)
                            }

                            }>
                            <div>
                                {location.name}
                            </div>
                        </Button>

                    )
                })}
            </div>
        </div>
        {thingsToCarry?.map((thingToCarry, index) => {

            if (thingToCarry.pickup && thingToCarry.dropoff)
            return (
                <div style={cssStyles.introCard}
                >
                    <h1>Tell us about Item {thingToCarry.itemNumber} </h1>
                    <div>
                        <div style={cssStyles.hiMsg}>

                            <div style={cssStyles.punch}>Item {thingToCarry.itemNumber} Client is: </div>
                            <div style={cssStyles.options}>

                                {clients?.map((client) => {
                                    return (
                                        <Button style={thingToCarry.client == client.name ? cssStyles.goButtonSelected : cssStyles.goButton}
                                            onClick={() => {
                                                handleAssetStateChange(thingToCarry.itemNumber, 'client', client)
                                                fetchInYardAssets(client)
                                            }

                                            }>
                                            <div>
                                                {client.name}
                                            </div>
                                        </Button>

                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {thingToCarry.clientPin && <div style={cssStyles.hiMsg}>

                        <div style={cssStyles.punch}>Pick Item from Yard Entry Register </div>
                        {currentInYardItems?.map((inYard) => {
                                return (
                                    <Button style={thingToCarry.type == inYard.type ? cssStyles.goButtonSelected : cssStyles.goButton}
                                        onClick={() => {
                                            handleAssetStateChange(thingToCarry.itemNumber, 'type', inYard.type)
                                            handleAssetStateChange(thingToCarry.itemNumber, 'chasis', { name: inYard.chassis })
                                        }

                                        }
                                    >
                                        <div>
                                           {inYard.type} / {inYard.chassis}
                                        </div>
                                    </Button>

                                )
                            })}
                        
                    </div>}

                    {thingToCarry.clientPin && <div style={cssStyles.hiMsg}>

                        <div style={cssStyles.punch}>Otherwise, Provide Item {thingToCarry.itemNumber} Chassis number: </div>
                        <TextField sx={{ color: "black" }} fullWidth label={thingToCarry.chasis ? "" : "Type the Chasis number for item "} id="fullWidth" defaultValue={thingToCarry.chasis}
                            inputRef={index == 0 ? textFieldRef0 : (index == 1 ? textFieldRef1 : textFieldRef2)}

                            onChange={
                                (event) => {
                                    let enteredChasis = (event.target.value);

                                    handleAssetStateChange(thingToCarry.itemNumber, 'chasis', { name: enteredChasis })
                                }
                            }



                        />

                        <img src={getimgForThing(thingToCarry.itemNumber)}>
                        </img>
                        <div style={cssStyles.punch}>What type of vehicle Item {thingToCarry.itemNumber} is? </div>
                        <div>

                            {things?.map((thing) => {
                                return (
                                    <Button style={thingToCarry.type == thing.name ? cssStyles.goButtonSelected : cssStyles.goButton}
                                        onClick={() => {
                                            handleAssetStateChange(thingToCarry.itemNumber, 'type', thing)
                                        }

                                        }
                                    >
                                        <div>
                                            {thing.name}
                                        </div>
                                    </Button>

                                )
                            })}
                        </div>
                    </div>}
                </div>)
        })}
    </div>)

}
const cssStyles = {
    container: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',

        justifyContent: 'center'
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    single: {
        width: 250,
        height: 100,
        marginBottom: 20
    },
    actions: {
        flexDirection: 'row-reverse',

        justifyContent: 'space-between'
    },
    scrollContainer: {

        height: '70%',

    },
    introCard: {
        marginTop: '12%',
        padding: '2%',
        zIndex: 1000,
        marginLeft: '2%',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(250,165,5,0.3)',
        width: '95%',
        shadowColor: "#ff0000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    introCardSelected: {
        marginTop: '2%',
        marginBottom: '2%',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: "orange",
        backgroundColor: 'rgba(250,250,210,0.5)',
        width: '95%',
        shadowColor: "#ff0000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    punch: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#111',
        paddingLeft: 10
    },

    hiMsg: {
        fontSize: 20,
        zIndex: 999,

        color: 'black'
    },
    secondLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    trips: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    oldTrips: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    input: {
        flexBasis: '80%',
        fontSize: 30,
        marginLeft: 10
    },
    heading: {
        color: 'orange',
        fontSize: 15,
    },
    para: {
        color: '#ffbd59',
        fontSize: 15,
    },
    inforLet: {
        flexDirection: 'column',
        margin: 10,
        borderLeftWidth: 8,
        borderLeftColor: '#ffbd59',
        paddingLeft: 10
    },

    tripButton: {
        fontSize: 44,
        color: '#ffbd59',
        width: '35%',
        marginBottom: 5,
        borderColor: 'mediumturquoise',
        backgroundColor: '#ffbd59',
        padding: 20
    },
    goButton: {
        fontSize: 24,
        color: '#000',
        marginBottom: 5,
        backgroundColor: '#D0D4D7',
        padding: 10,
        marginRight: 50
    },
    goButtonSelected: {
        fontSize: 24,
        color: 'orange',
        marginBottom: 5,
        borderColor: 'mediumturquoise',
        borderWidth: 1,
        backgroundColor: '#516273',
        padding: 10,
        marginRight: 50
    }



};