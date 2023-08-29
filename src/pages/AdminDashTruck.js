
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import React from "react";
import FreightVIew from "../components/FreightView";
import firebase from "./../Backend/firebase";
import { TextField, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { LoadScript } from '@react-google-maps/api';
var _ = require('underscore');


function AdminDash() {

    let navigate = useNavigate();
    const [vins, setVins] = React.useState([]);
    const [trucks, setTrucks] = Reat.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const searchInputRef = React.useRef(null);

    function handleNewTrip() {

        navigate("/createTrip", {

        });

    }



    React.useEffect(() => {
        const pin = localStorage.getItem('pin');


        if (pin) {
            firebase.database.ref("1/clients")
                .on('value', snapshot => {
                    let clientsData = snapshot.val();

                    clientsData = Object.values(clientsData);

                    let allVins = [];

                    clientsData?.map(clientData => {

                        if (!clientData.vins) {
                            return;
                        }
                        let vins = Object.values(clientData.vins);
                        allVins = allVins.concat(vins);
                    })


                    setVins(allVins);

                    let trcs = _.groupBy(allVins, function(vin) {
                        return vin.truck || "";
                    });

                    let trcks = [];

                    _.each(trcs, function(vins, prop) {
                        let truck = {
                            name: prop,
                            trips: _.groupBy(vins, function(vin) {
                                return vin.tripCode
                            })
                        };

                        trcks.push(truck);
                    });

                    setTrucks(trcs);

                    
                })


        }


        else {
            navigate("/entry");
        }

    }, [])


    function toLower(txt) {
        return txt?.toLowerCase();
    }


    return (
        <React.Fragment>
            <CssBaseline />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2, mb: 2, mr: 2 }}>
                <Typography mt={5} mb={5} ml={5} variant="h5" gutterBottom component="div">Hi CBC Interstate Pty Ltd</Typography>
                <Button variant="outlined" onClick={() => { localStorage.removeItem("pin"); navigate("/entry") }}>sign Out</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2, mb: 2, mr: 2 }}>
                <Button style={{ marginLeft: 4 }} variant="contained" onClick={() => { handleNewTrip() }}>Create New Trip</Button>
                <Button style={{ marginLeft: 4 }} variant="contained" onClick={() => { navigate("/deleteTrip"); }}>Delete Existing Trip</Button>
            </Box>

            <TextField ml={5} fullWidth label="Search by Chasis or route or driver or truck or date" id="fullWidth"
                inputRef={searchInputRef} onChange={(text) => {
                    setSearchText(toLower(searchInputRef?.current?.value));
                }} />

            <Box>
                {vins && vins.map &&
                    vins?.map(vin => {

                        let pass = true;



                        if (searchText != "") {
                            pass = false;
                        }

                        if ((toLower(vin.vin)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.actualDate)?.search(searchText)) > -1) {
                            pass = true;
                        }

                        if ((toLower(vin.tripCode)?.search(searchText)) > -1) {
                            pass = true;
                        }

                        if ((toLower(vin.plannedDate)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.status)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.truck)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.driver)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.pickup + vin.dropoff + vin)?.search(searchText)) > -1) {
                            pass = true;
                        }

                        if (!pass) {
                            return null;
                        }

                        if (vin.status == 'expired') {
                            return null;
                        }

                        return <LoadScript
                            googleMapsApiKey="AIzaSyCukllD41m_OUPJ--4vM6ynW7X6kIKrJU4"
                        > <FreightVIew ml={5}
                            type={vin.type}
                            chasis={vin.vin}
                            stage={vin.stage}
                            route={vin.pickup + " to " + vin.dropoff}
                            plannedDate={vin.plannedDate}
                            actualDate={vin.actualDate}
                            status={vin.status}
                            truck={vin.truck}
                            driver={vin.driver}
                            tripCode={vin.tripCode}
                        >

                            </FreightVIew>
                        </LoadScript>
                    })
                } </Box>

        </React.Fragment>
    );
}
export default AdminDash;