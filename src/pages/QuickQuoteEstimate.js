import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import "../App.css"
import { Typography } from '@mui/material';




export default function QuickQuoteEstimate() {

    const { view } = useParams();
    const [origin, setOrigin] = React.useState(null);
    const [destination, setDestination] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [size, setSize] = React.useState(null);
    const [missing, setMissing] = React.useState(false);
    const [transportCharge, setTransportCharge] = React.useState(null);
    const [fuelCharge, setFuelCharge] = React.useState(null);
    const [gst, setGst] = React.useState(null);
    const [fullCharge, setFullCharge] = React.useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleOriginChange = (event) => {
        setOrigin(event.target.value);
        console.log(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const getTransportCharge = () => {

        setMissing(false);
        if (origin && destination && type && size) {

            //////////////////M-P///////////////////////////////////////////

            if (origin == 'Melbourne' && destination == 'Perth' && type == "Caravan" && size == "l27") {
                return 3850;
            }
            else if (origin == 'Melbourne' && destination == 'Perth' && type == "Caravan" && size == "b2730") {
                setMissing(true);

            }
            else if (origin == 'Melbourne' && destination == 'Perth' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////P-M///////////////////////////////////////////
            else if (origin == 'Perth' && destination == 'Melbourne' && type == "Caravan" && size == "l27") {
                return 3990;

            }
            else if (origin == 'Perth' && destination == 'Melbourne' && type == "Caravan" && size == "b2730") {
                setMissing(true);
            }
            else if (origin == 'Perth' && destination == 'Melbourne' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////M-S///////////////////////////////////////////

            else if (origin == 'Melbourne' && destination == 'Sydney' && type == "Caravan" && size == "l27") {
                return 1099;
            }
            else if (origin == 'Melbourne' && destination == 'Sydney' && type == "Caravan" && size == "b2730") {
                setMissing(true);

            }
            else if (origin == 'Melbourne' && destination == 'Sydney' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////S-M///////////////////////////////////////////
            else if (origin == 'Sydney' && destination == 'Melbourne' && type == "Caravan" && size == "l27") {
                return 1099;

            }
            else if (origin == 'Sydney' && destination == 'Melbourne' && type == "Caravan" && size == "b2730") {
                setMissing(true);
            }
            else if (origin == 'Sydney' && destination == 'Melbourne' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }

            //////////////////B-P///////////////////////////////////////////

            else if (origin == 'Brisbane' && destination == 'Perth' && type == "Caravan" && size == "l27") {
                return 1099;
            }
            else if (origin == 'Brisbane' && destination == 'Perth' && type == "Caravan" && size == "b2730") {
                setMissing(true);

            }
            else if (origin == 'Brisbane' && destination == 'Perth' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////P-B///////////////////////////////////////////
            else if (origin == 'Perth' && destination == 'Brisbane' && type == "Caravan" && size == "l27") {
                return 1099;

            }
            else if (origin == 'Perth' && destination == 'Brisbane' && type == "Caravan" && size == "b2730") {
                setMissing(true);
            }
            else if (origin == 'Perth' && destination == 'Brisbane' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }

            //////////////////M-A///////////////////////////////////////////

            else if (origin == 'Melbourne' && destination == 'Adelaide' && type == "Caravan" && size == "l27") {
                return 1099;
            }
            else if (origin == 'Melbourne' && destination == 'Adelaide' && type == "Caravan" && size == "b2730") {
                setMissing(true);

            }
            else if (origin == 'Melbourne' && destination == 'Adelaide' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////A-M///////////////////////////////////////////
            else if (origin == 'Adelaide' && destination == 'Melbourne' && type == "Caravan" && size == "l27") {
                return 1099;

            }
            else if (origin == 'Adelaide' && destination == 'Melbourne' && type == "Caravan" && size == "b2730") {
                setMissing(true);
            }
            else if (origin == 'Adelaide' && destination == 'Melbourne' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }

            //////////////////M-B///////////////////////////////////////////

            else if (origin == 'Melbourne' && destination == 'Brisbane' && type == "Caravan" && size == "l27") {
                return 1949;
            }
            else if (origin == 'Melbourne' && destination == 'Brisbane' && type == "Caravan" && size == "b2730") {
                setMissing(true);

            }
            else if (origin == 'Melbourne' && destination == 'Brisbane' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }


            //////////////////B-M///////////////////////////////////////////
            else if (origin == 'Brisbane' && destination == 'Melbourne' && type == "Caravan" && size == "l27") {
                return 1949;

            }
            else if (origin == 'Brisbane' && destination == 'Melbourne' && type == "Caravan" && size == "b2730") {
                setMissing(true);
            }
            else if (origin == 'Brisbane' && destination == 'Melbourne' && type == "Caravan" && size == "m30") {
                setMissing(true);
            }

            else {
                setMissing(true);
            }
        }
        else {
            setMissing(true);
        }

    }

    function setQuote() {
        let transport = getTransportCharge();

        setTransportCharge(transport);

        if (transport) {
            let fuel = transport * 0.09;
            let gstt = (transport + fuel) * 0.1
            setFuelCharge(Math.round(fuel, 2));
            setGst(Math.round(gstt, 2));
            setFullCharge(Math.round(gstt + fuel + transport));
            handleClickOpen();
        }
        else {
            setFuelCharge(null);
            setGst(null);
            setFullCharge(null);
            setTransportCharge(null);
            handleClickOpen();
        }
    }



    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ display: 'flex', padding: '2%', flexDirection: (view == 1 ? 'row' : "column"), justifyContent: "space-between", width: '100%' }} >


                <FormControl style={{ margin: '1%' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Origin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={origin}
                        label="Origin"
                        onChange={handleOriginChange}
                    >
                        {type !== "Melbourne" && <MenuItem value={"Melbourne"}>Melbourne</MenuItem>}
                        {type !== "Sydney" && <MenuItem value={"Sydney"}>Sydney</MenuItem>}
                        {type !== "Adelaide" && <MenuItem value={"Adelaide"}>Adelaide</MenuItem>}
                        {type !== "Brisbane" && <MenuItem value={"Brisbane"}>Brisbane</MenuItem>}
                        {type !== "Perth" && <MenuItem value={"Perth"}>Perth</MenuItem>}
                    </Select>
                </FormControl>
                <FormControl style={{ margin: '1%' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Destination</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={destination}
                        label="Destination"
                        onChange={handleDestinationChange}
                    >
                        {type !== "Melbourne" && <MenuItem value={"Melbourne"}>Melbourne</MenuItem>}
                        {type !== "Sydney" && <MenuItem value={"Sydney"}>Sydney</MenuItem>}
                        {type !== "Adelaide" && <MenuItem value={"Adelaide"}>Adelaide</MenuItem>}
                        {type !== "Brisbane" && <MenuItem value={"Brisbane"}>Brisbane</MenuItem>}
                        {type !== "Perth" && <MenuItem value={"Perth"}>Perth</MenuItem>}
                    </Select>
                </FormControl>
                <FormControl style={{ margin: '1%' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        {origin !== "Melbourne" && <MenuItem value={"Car"}>Car</MenuItem>}
                        <MenuItem value={"Caravan"}>Caravan</MenuItem>
                        <MenuItem value={"Boat"}>Boat</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ margin: '1%' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Vehicle Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Type"
                        onChange={handleSizeChange}
                    >
                        {type == "Car" && <MenuItem value={"Sedan"}>Sedan</MenuItem>}
                        {type == "Car" && <MenuItem value={"Light Commercial"}>Light Commercial</MenuItem>}
                        {type == "Car" && <MenuItem value={"SUV"}>SUV</MenuItem>}

                        {type == "Caravan" && <MenuItem value={"l27"}>Less than 27 ft</MenuItem>}
                        {type == "Caravan" && <MenuItem value={"b2730"}>Between 27 to 30 ft</MenuItem>}
                        {type == "Caravan" && <MenuItem value={"m30"}>More than 30 ft</MenuItem>}

                        {type == "Boat" && <MenuItem value={"small"}>Small</MenuItem>}
                        {type == "Boat" && <MenuItem value={"medium"}>Medium</MenuItem>}
                        {type == "Boat" && <MenuItem value={"large"}>Large</MenuItem>}

                    </Select>
                </FormControl>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} autoFocus>
                            X
                        </Button>
                    </DialogTitle>
                    <DialogContent style={{ overflow: "hidden" }}>
                        {!missing && <DialogContentText id="alert-dialog-description">
                            <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                PickUp
                                <span style={{ color: '#CD860D', marginLeft: "10vw" }}>
                                    {origin}
                                </span>
                            </Typography>

                            <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                Deliver to
                                <span style={{ color: '#CD860D', marginLeft: "10vw" }}>
                                    {destination}
                                </span>
                            </Typography>

                            <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span>
                                    Transport Charge
                                </span>

                                <span style={{ color: '#CD860D', marginLeft: "10vw" }}>
                                    {transportCharge && "A$ " + transportCharge}
                                </span>
                            </Typography>

                            <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span>
                                    Fuel Surcharge
                                </span>

                                <span style={{ color: '#CD860D', marginLeft: "10vw" }}>
                                    {fuelCharge && "A$ " + fuelCharge}
                                </span>

                            </Typography>

                            <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span>
                                    GST
                                </span>

                                <span style={{ color: '#CD860D', marginLeft: "10vw" }}>
                                    {gst && "A$ " + gst}
                                </span>
                            </Typography>

                            <Typography style={{ display: 'flex', flexDirection: 'row', background: "#CD860D", padding: '2px', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.2em' }}>
                                    TOTAL
                                </span>

                                <span style={{ fontSize: '1.7em' }}>
                                    {fullCharge && "A$ " + fullCharge}
                                </span>
                            </Typography>


                        </DialogContentText>}


                        {missing && <DialogContentText id="alert-dialog-description">
                            <Typography>
                                We are unable to provide instant quotation for your selection. Please call us to discuss your requirements with our staff. 
                                Or click the Contact Us button below to send our staff an email about your specific requirements
                            </Typography>

                        </DialogContentText>}

                    </DialogContent>

                </Dialog>
            </div>
            <div style={{ display: 'flex', padding: '2%', flexDirection: 'row', justifyContent: "center", width: '100%' }}>
                <Button variant="contained" style={{ fontSize: '2.0rem', fontWeight: "bolder", color: '#E3C798' }} onClick={() => {
                    setQuote();

                }} disabled={!(origin && destination && size && type)}>
                    Get Instant Quote
                </Button>
            </div>
        </React.Fragment>
    );
}


const cssStyles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButton: {
        marginTop: 10,
        marginLeft: 10
    },
    punch: {
        fontSize: 20,
        marginBottom: 40,
        marginTop: 10,
        color: '#ff1616',

    },
    input: {
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#bbb',
        backgroundColor: '#eee',
        fontSize: 20
    },
    gap: {
        marginTop: 30,
        marginBottom: 100
    },
    actions: {
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    logo: {
        flex: 0,
        width: '100%',
        height: '100%',

    },
    logoContainer: {
        flexBasis: "50%",
        width: '100%',
        height: '100%',

    },

    button: {
        fontSize: 44,
        color: '#ffbd59',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'mediumturquoise',
        backgroundColor: '#ffbd59',
        padding: 20
    },
    stepLabel: {
        color: "black"
    }

};
