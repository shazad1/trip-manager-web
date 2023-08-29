
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import React from "react";
import FreightVIew from "../components/FreightView";
import firebase from "./../Backend/firebase";
import { TextField, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { LoadScript } from '@react-google-maps/api';
import { Pin } from "@mui/icons-material";


function ClientDash() {

    let navigate = useNavigate();
    const [vins, setVins] = React.useState([]);
    const [filterNode, setFilterNode] = React.useState("")
    const [searchText, setSearchText] = React.useState("");
    const searchInputRef = React.useRef(null);
    const [clientName, setClientName] = React.useState("");
    const [currentInYardItems, setCurrentInYardItems] = React.useState();


    function handleNewTrip() {

        navigate("/createTrip", {

        });

    }

    React.useEffect(() => {
        const pin = localStorage.getItem('pin');
        if (pin) {
            firebase.database.ref("1/clients")
                .orderByChild('pin').equalTo(pin)
                .on('value', snapshot => {
                    const clientData = snapshot.val();

                    if (clientData && clientData[pin] && clientData[pin].vins) {
                        let vinsData = Object.values((clientData[pin].vins)).map(vin => {
                            if (vin.stage == 'planning')
                                vin.stage = "In yard"
                            else if (vin.stage == "enroute")
                                vin.stage = "In transit"
                            else
                                vin.stage = "Delivered"

                            return vin;
                        })
                        setVins(vinsData);

                    }
                    if (clientData && clientData[pin]) {

                        setClientName(clientData[pin].name);
                    }


                })
            firebase.database.ref("1/inyard/" + Pin)
                .on('value', snapshot => {
                    let inYard = snapshot.val();

                    inYard = Object.values(inYard);
                    setCurrentInYardItems(inYard);

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

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', pt: 2, mb: 2, mr: 2 }}>
                <Button variant="outlined" onClick={() => { localStorage.removeItem("pin"); navigate("/entry") }}>sign Out</Button>
            </Box>

            {clientName && <Typography mt={5} mb={5} ml={5} variant="h5" gutterBottom component="div">Hi {clientName}</Typography>}

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2, mb: 2, mr: 6, ml: 6 }}>
                <Button
                    sx={{
                        color: filterNode == "In yard" ? "orange" : "white"
                    }}
                    variant="contained" size="large" onClick={() => { setFilterNode("In yard") }}>In Yard</Button>
                <Button
                    sx={{
                        color: filterNode == "In transit" ? "orange" : "white"
                    }}
                    variant="contained" size="large" onClick={() => { setFilterNode("In transit") }}>In Transit</Button>
                <Button
                    sx={{
                        color: filterNode == "Delivered" ? "orange" : "white"
                    }}
                    variant="contained" size="large" onClick={() => { setFilterNode("Delivered") }}>Delivered</Button>
            </Box>

            <TextField ml={5} fullWidth label="Search by Chasis or route or driver or truck or date" id="fullWidth"
                inputRef={searchInputRef} onChange={(text) => {
                    setFilterNode("")
                    setSearchText(toLower(searchInputRef?.current?.value));
                }} />
            {vins && vins.map &&
                vins?.map(vin => {

                    let pass = true;

                    if (filterNode !== "") {
                        pass = false
                        if (filterNode == vin.stage) {
                            pass = true;
                        }
                    } else {



                        if (searchText != "") {
                            pass = false;
                        }

                        if ((toLower(vin.vin)?.search(searchText)) > -1) {
                            pass = true;
                        }


                        if ((toLower(vin.actualDate)?.search(searchText)) > -1) {
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
                        route={vin.pickup + " to " + vin.dropoff}
                        plannedDate={vin.plannedDate}
                        actualDate={vin.actualDate}
                        status={vin.status}
                        stage={vin.stage}
                        truck={vin.truck}
                        driver={vin.driver}
                        tripCode={vin.tripCode}



                    >

                        </FreightVIew>
                    </LoadScript>
                })
            }

        </React.Fragment>
    );
}
export default ClientDash;