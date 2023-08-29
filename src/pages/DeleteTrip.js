
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import React from "react";
import Box from '@mui/material/Box';
import firebase from "./../Backend/firebase";
import { TextField, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import SelectableItem from "../components/selectableItem";

function DeleteTrip() {

    let navigate = useNavigate();
    const [trips, setTrips] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const searchInputRef = React.useRef(null);
    const [selectedTripCode, setSelectedTripCode] = React.useState(null);

    function onTripSelect(ids, values) {
        if (values) {
            setSelectedTripCode(ids.selectedTripCode)
        }
    }




    React.useEffect(() => {
        const pin = localStorage.getItem('pin');
        let tripTray = [];

        if (pin) {
            firebase.database.ref("1/people")
                .on('value', snapshot => {
                    let people = snapshot.val();
                    tripTray = [];
                    people = Object.values(people);

                    people?.map(person => {

                        if (!person) {
                            return;
                        }


                        let tripps = Object.values(person);
                        tripps.map(tripCon => {
                            let trips = Object.values(tripCon);
                            tripTray = tripTray.concat(trips);
                        })

                    })

                    setTrips(tripTray);
                })


        }


        else {
            navigate("/entry");
        }

    }, [])


    function toLower(txt) {
        return txt?.toLowerCase();
    }

    async function  deleteSelected() {
        if (selectedTripCode) {
            let tripTODelete = trips.find(trip => {
                return trip.tripCode == selectedTripCode;
            });

            let clientage = [];

            if (tripTODelete) {

                tripTODelete.thingsToCarry?.map(thing => {
                    clientage.push({
                        vin: thing.chasis,
                        clientPin: thing.clientPin
                    })
                });


                let pin = tripTODelete.pin;
                await firebase.database.ref("1/people/"+pin+"/trips/"+selectedTripCode+"/status").set("expired");
                setSelectedTripCode(null);

                for (let a = 0; a < clientage.length; a++) {
                    await firebase.database.ref("1/clients/"+clientage[a].clientPin+"/vins/"+clientage[a].vin).set("expired");
                }
            }
        }
    }

    function detail(thingsToCarry) {
        let content = "";


        thingsToCarry?.map(thing => {
            content += " [" + thing.itemNumber + "] " + thing.type + " Chassis " + thing.chasis + " from " + thing.pickup + " to " + thing.dropoff + " for " + thing.client;
        })

        return content;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2, mb: 2, mr: 2 }}>
                <Button variant="contained" onClick={() => { deleteSelected() }}>Delete Selected Trip</Button>
                {(
                        <Button variant="contained" color="inherit" onClick={() => { navigate("/admindash") }} sx={{ mr: 1 }}>
                            Go Back to Dashboard
                        </Button>
                    )}
            </Box>
            <TextField ml={5} fullWidth label="Search a trip to delete" id="fullWidth"
                inputRef={searchInputRef} onChange={(text) => {
                    setSearchText(toLower(searchInputRef?.current?.value));
                }} />
            {trips && trips.map &&
                trips?.map(trip => {

                    let pass = true;

                    if (searchText != "") {
                        pass = false;
                    }

                    if ((toLower(trip.tripCode)?.search(searchText)) > -1) {
                        pass = true;
                    }


                    if ((toLower(trip.driver)?.search(searchText)) > -1) {
                        pass = true;
                    }

                    if ((toLower(trip.truck)?.search(searchText)) > -1) {
                        pass = true;
                    }

                    if ((toLower(trip.plannedDate)?.search(searchText)) > -1) {
                        pass = true;
                    }


                    if ((toLower(JSON.stringify(trip.thingsToCarry))?.search(searchText)) > -1) {
                        pass = true;
                    }

                    if (!pass) {
                        return null;
                    }

                    if (trip.status == 'expired') {
                        return null;
                    }

                    return <SelectableItem ml={5}
                        subHeading1={trip.plannedDate}
                        Heading={trip.tripCode}
                        ids={{ selectedTripCode: trip.tripCode }}
                        subHeading2={trip.driver + " " + trip.truck}
                        details={detail(trip.thingsToCarry)}
                        selected={selectedTripCode === trip.tripCode}
                        onSelected={onTripSelect}
                    >

                    </SelectableItem>
                })
            }

        </React.Fragment>
    );
}
export default DeleteTrip;