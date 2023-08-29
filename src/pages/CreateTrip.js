import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PickATruck from '../components/PickATruck.js';
import PickADriver from '../components/PickADriver.js';
import FreightConfig from '../components/FreightConfig.js';
import FreightLoad from '../components/FreightLoad.js';
import ReviewAssign from '../components/ReviewAssign.js';
import PlannedDate from '../components/PlannedDate.js';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

const steps = ['Pick a Truck', 'Pick a Driver', 'Configure Load', 'Load Freight', "Set Plan Date", 'Review & Confirm'];

export default function CreateTrip() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    let navigate = useNavigate();
    const [fleet, setFleet] = React.useState([]);
    const [things, setThings] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [drivers, setDrivers] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [numberOfThings, setNumberOfThings] = React.useState(null);
    const [configType, setConfigType] = React.useState(null);
    const [selectedDriver, setSelectedDriver] = React.useState(null);
    const [selectedTruck, setSelectedTruck] = React.useState(null);
    const [selectedThings, setSelectedThings] = React.useState(null);
    const [plannedDate, setPlannedDate] = React.useState(Date());


    React.useEffect(() => {
        const pin = localStorage.getItem('pin');
        if (pin) {

        }
        else {
            navigate("/entry");
        }

    }, [])

    function onDateChange(pD) {
        setPlannedDate(pD);
    }

    function handleGoDash() {
        navigate("/admindash");
    }


    function onThingsSelection(selectedThings) {
        setSelectedThings(selectedThings);
    }

    function setConfig(nOt, ct) {
        setNumberOfThings(nOt);
        setConfigType(ct);
    }

    function onDriverSelection(ids, value) {
        setSelectedDriver(ids.selectedDriver);
    }

    function onTruckSelection(ids, value) {
        setSelectedTruck(ids.selectedTruck);
    }

    React.useEffect(async () => {

        let response = await fetch("https://asia-southeast2-tawtripmanager.cloudfunctions.net/getDataToBuildTrip", {
        });

        let details = await response.json();

        setFleet(details.fleet);
        setThings(details.things);
        setClients(details.clients);
        setDrivers(details.drivers);
        setLocations(details.locations);
    }, [])

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <React.Fragment>
      <CssBaseline />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', pt: 2, mb: 2, mr: 2 }}>
                {(
                    <Button color="inherit" onClick={() => { handleGoDash() }} sx={{ mr: 1 }}>
                        Go Back to Dashboard
                    </Button>
                )}
                <Button variant="outlined" onClick={() => { localStorage.removeItem("pin"); navigate("/entry") }}>sign Out</Button>
            </Box>
            <Box sx={{ width: '90%', marginTop: 5 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption" >Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>    <Typography variant="caption" sx={{color: "black"}} >{label}</Typography></StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (

                    <React.Fragment>
                        <Box sx={{ display: 'flex', postion: 'relative', flexDirection: 'row', justifyContent: 'space-between', pt: 2, mb: 2, mr: 2 }}>
                            <Button
                           
                                variant="contained"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{
                                    mr: 1, position: 'fixed', bottom: '50vh', right: '5%'

                                }}
                            >
                                Back
                            </Button>




                            <Button variant="contained" onClick={handleNext} sx={{
                                mr: 1, position: 'fixed', bottom: '40vh', right: '5%'

                            }}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>

                        {activeStep === 0 ?
                            (
                                <PickATruck sx={{m: '25px', width: '50%'}} fleet={fleet} selectedTruck={selectedTruck} onSelection={onTruckSelection}></PickATruck>


                            ) : null
                        }
                        {activeStep === 1 ?
                            (
                                <PickADriver sx={{m: '25px'}} drivers={drivers} selectedDriver={selectedDriver} onSelection={onDriverSelection}></PickADriver>
                            ) : null
                        }
                        {activeStep === 2 ?
                            (
                                <FreightConfig sx={{m: '25px'}} selectedNumberOfThings = {numberOfThings} selectedConfigType = {configType} onConfigSet={setConfig}></FreightConfig>
                            ) : null
                        }
                        {activeStep === 3 ?
                            (

                                <FreightLoad sx={{m: '25px'}} things={things} onThingsSelection={onThingsSelection} selectedThings = {selectedThings} clients={clients} locations={locations} numberOfThings={numberOfThings} configType={configType}>
                                </FreightLoad>
                            ) : null
                        }
                        {activeStep === 4 ?
                            (

                                <PlannedDate selectedDate = {plannedDate} onDateChange={onDateChange}>
                                </PlannedDate>
                            ) : null
                        }
                        {activeStep === 5 ?
                            (

                                <ReviewAssign sx={{m: '25px'}} selectedThings={selectedThings} plannedDate={plannedDate} selectedDriver={selectedDriver} selectedTruck={selectedTruck} selectedConfig={configType}>
                                </ReviewAssign>
                            ) : null
                        }

                    </React.Fragment>
                )
                }
            </Box >
        </React.Fragment>
    );
}