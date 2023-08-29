import * as React from 'react';
import Button from '@mui/material/Button';
import firebase from "../Backend/firebase";
import { margin } from '@mui/system';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function ReviewAssign(props) {

    const selectedDriver = props.selectedDriver;
    const selectedTruck = props.selectedTruck;
    const selectedThings = props.selectedThings;
    const selectedConfig = props.selectedConfig;
    const [errorMsg, setErrorMsg] = React.useState("");
    const plannedDate = props.plannedDate;
    let navigate = useNavigate();

    var found = selectedThings.find((thing, index) => {

        return ((!thing.chasis || thing.chasis == "") ||
            (!thing.pickup || thing.pickup == "") ||
            (!thing.dropoff || thing.dropoff == "") ||
            (!thing.type || thing.type == "") ||
            (!thing.clientPin || thing.clientPin == ""))
    });

    if (found && errorMsg == "") {
        setErrorMsg("Missing information. Please make sure you have provided chaisis, pickup, dropoff, type and client information for item" + found.itemNumber)
    }

    if ((!selectedTruck || !selectedDriver || !selectedDriver?.name) && errorMsg == "") {
        setErrorMsg("Missing information. Please make sure you have provided truck and driver information");

    }

    async function handleAssignment() {




        var dt = new Date();

        var datePart = "__" + dt.getFullYear() + "_" + (dt.getMonth() + 1) + "_" + dt.getDate() + "__";
        var tripName = selectedDriver?.initials;
        tripName += "" + datePart;

        const now = new Date();
        const number = (Math.round(Math.random() * 20));

        let mileposts = {};
        const types = ["at pickup", "in midway", "at dropoff"]

        let offset = 0;
        selectedThings.map((thing, index) => {

            if (index == 1) {
                offset = types.length;
            }

            if (index == 2) {
                offset = 2 * (types.length);
            }

            for (let a = offset; a < (types.length + offset); a++) {
                mileposts[a] = {
                    id: a,
                    itemNumber: thing.itemNumber,
                    name: "Pictures of Item " + (index + 1) + " " + thing.type + " " + types[(a - offset)],
                    type: "pictures",
                    pictures: (thing.itemNumber == 1 ? {
                        1: {
                            number: 1
                        },
                        2: {
                            number: 2
                        },
                        3: {
                            number: 3
                        },
                        4: {
                            number: 4
                        },
                        5: {
                            number: 5
                        },
                        6: {
                            number: 6
                        },
                        7: {
                            number: 7
                        },
                        8: {
                            number: 8
                        },
                        9: {
                            number: 9
                        }
                    } : {
                        1: {
                            number: 1
                        },
                        2: {
                            number: 2
                        },
                        3: {
                            number: 3
                        },
                        4: {
                            number: 4
                        },
                        5: {
                            number: 5
                        }
                    }
                    )
                }
            }

        });
        const name = tripName + "" + number;




        await firebase.database
            .ref("1/people/" + selectedDriver.pin +
                "/trips/" + name).set({
                    name: name,
                    status: "active",
                    stage: 'planning',
                    business: 'CBC Interstate Pty Ltd',
                    truck: selectedTruck?.name,
                    driver: selectedDriver?.name,
                    pin: selectedDriver?.pin,
                    mileposts: mileposts,
                    thingsToCarry: selectedThings,
                    config: selectedConfig,
                    plannedDate: plannedDate.toString(),
                    tripCode: name
                })




        for (let b = 0; b < selectedThings.length; b++) {
            let thing = selectedThings[b];
            await firebase.database
                .ref("1/clients/" + thing.clientPin +
                    "/vins/" + thing.chasis).set({
                        type: 'chasis',
                        vin: thing.chasis,
                        status: "active",
                        stage: 'planning',
                        driverPin: selectedDriver?.pin,
                        truck: selectedTruck?.name,
                        driver: selectedDriver?.name,
                        pickup: thing.pickup,
                        dropoff: thing.dropoff,
                        type: thing.type,
                        plannedDate: (plannedDate).toString(),
                        tripCode: name
                    })
        }


        navigate("/admindash")

    }

    return (<div style={cssStyles.container}>

        <Box sx={{
            backgroundColor: '#D0D4D7',
            borderColor: "orange",
            borderWidth: "2px",
            borderStyle: "solid",
            display: 'flex',
            flexDirection: 'column',
            margin: 10
        }}>
            <div style={cssStyles.punch}>
                Truck:
            </div>
            <div style={cssStyles.hiMsg}>
                {selectedTruck?.name} {selectedTruck?.regNo}
            </div>
            <div style={cssStyles.punch}>
                Driver
            </div>
            <div style={cssStyles.hiMsg}>
                {selectedDriver?.name} {selectedDriver?.mobile}
            </div>
            <div style={cssStyles.punch}>
                Planned Date
            </div>
            <div style={cssStyles.hiMsg}>
                {plannedDate?.toString()}
            </div>
            <div style={cssStyles.punch}>
                Freight carried by the truck:
            </div>
            <Box sx={{
                backgroundColor: '#D0D4D7',
                display: 'flex',
                flexDirection: 'row',
            }}>
                {(selectedThings || []).map((thing, index) => (

                    <div style={cssStyles.hiMsg}>
                        Item {index + 1}: {thing.type} Chassis {thing.chasis} for {thing.client} from {thing.pickup} to {thing.dropoff}
                    </div>))}
            </Box>


        </Box>

        <div>{errorMsg}</div>

        <Box sx={{

            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: 10
        }}>

            <Button variant="contained" sx={{ pr: 20, pl: 20 }} disabled={errorMsg != ""}
                onClick={() => {
                    handleAssignment()
                }

                }
            >

                Assign

            </Button>

        </Box>



    </div>)

}
const cssStyles = {
    container: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',

        justifyContent: 'center'
    },
    actions: {
        flexDirection: 'row-reverse',

        justifyContent: 'space-between'
    },
    scrollContainer: {

        height: '70%',

    },
    introCard: {
        marginTop: '2%',
        marginBottom: '2%',
        flexDirection: 'column',
        borderWidth: 1,
        backgroundColor: 'transparent',
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
        backgroundColor: 'rgba(0,200,0, 0.2)',
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
        fontSize: 13,
        marginBottom: 5,
        marginTop: 5,
        color: '#111',
        paddingLeft: 10
    },

    hiMsg: {
        fontSize: 10,
        marginBottom: 10,
        fontWeight: '800',
        color: '#516273',

        alignSelf: 'center',
        paddingLeft: 15
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
        color: '#ff1616',
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
        fontSize: 44,
        color: '#ffbd59',
        marginBottom: 5,
        borderColor: 'mediumturquoise',
        backgroundColor: '#ffbd59',
        padding: 20,
        marginRight: 10
    }


};