import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import { GoogleMap, LoadScript, InfoBox, Circle } from '@react-google-maps/api';
import { DriveFileRenameOutlineRounded } from '@mui/icons-material';
import TruckImage from './../assets/sb13pd.PNG';
import { CardActions, CardHeader } from '@mui/material';

const _ = require("underscore");

const options = { closeBoxURL: '', enableEventPropagation: true };

const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
};

const cssStyle = {
    labels: {
        marginTop: 5
    }
};

const containerStyle = {
    width: '70vw',
    height: '70vh'
};

const cent = {
    lat: -3.745,
    lng: -38.523
};

const styles = {
    heading: {
        color: '#ff1616',
        fontSize: 15,
    },
    para: {
        fontSize: 15,
    },
    inforLet: {
        flexDirection: 'column',
        borderColor: 'black',
        borderLeftWidth: 8,
        borderLeftColor: '#ffbd59',

    }
}

export default function TruckView(
    props
) {

    const details = props.details;
    const trips = Object.values(details.trips) || [];

    const [showPlans, setShowPlans] = React.useState(false);
    const [currentTripCode, setCurrentTripCode] = React.useState(null);

    const [points, setPoints] = React.useState([]);
    const [currentTrip, setCurrentTrip] = React.useState([]);
    const [map, setMap] = React.useState(null);
    const [center, setCenter] = React.useState(cent);

    const handleChange = (panel) => async (event, isExpanded) => {
        ;
    };

    const MINUTE_MS = 20 * 60000;

    React.useEffect(() => {
        const interval = setInterval(() => {
            getCurrentTrip();
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    async function getCurrentTrip() {
        let response = await fetch("https://asia-southeast2-tawtripmanager.cloudfunctions.net/getTrackPosts?tripCode=" + currentTripCode, {
        });
        let details = await response.json();



        if (_.isEmpty(details.track)) {
            return;
        }

        try {

            if (details?.trip?.progress) {
                let prg = parseFloat(details.trip?.progress) * 100;
                prg = Math.round(parseInt(prg));

                details.trip.progress = prg;
            }
        } catch (ex) {
            ;
        }

        setCurrentTrip(details.trip);

        let points = Object.values(details.track.points);


        points = points.reverse();


        if (points && points[0] && points[0].latLong) {
            let latLong = points[0].latLong;
            setCenter({ lat: latLong.latitude, lng: latLong.longitude });
        }

        setPoints(points);

    }

    return (
        <div>
            <Accordion style={{ marginLeft: 3, marginTop: 20 }} onChange={handleChange("panel1")}>
                <AccordionSummary
                    style={{
                        justifyCotent: "space-between",
                        backgroundColor: "#D0D4D7"

                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    <Stack flexDirection="row">
                        <Stack sx={{ marginLeft: 3 }} direction="row" spacing={1}>
                            <img src={TruckImage} style={{ width: '10%', borderWidth: '2px', borderRadius: '15%' }}></img>
                        </Stack>
                        <Stack sx={{ marginLeft: 1 }} >
                   
                                <Typography sx={{ fontSize: 24, color:"orange", fontWeight: "bolder" }} gutterBottom>
                                    {details.name}
                                </Typography>
                       


                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Trips linked with this truck</Typography>
                    <Button variant="contained" sx={{
                        alignSelf: 'center',
                        marginLeft: '40%',
                        marginTop: '1%',

                        marginBottom: '1%'
                    }} onClick={async () => {
                        setShowPlans(showPlans ? false : true)
                    }} >{!showPlans ? 'Show Future & Past Trips' : 'Hide Future & Past Trips'}</Button>
                    {trips && trips.map(tripItems => {

                        if (tripItems && tripItems[0]) {
                            let tripDetails = tripItems[0];

                            let stage = tripDetails.stage;

                            if ((stage == 'planning' || stage == 'ended') && !showPlans) {
                                return;
                            }

                            let pickup = tripDetails.pickup;
                            let dropoff = tripDetails.dropoff;
                            let driver = tripDetails.driver;
                            let tripCode = tripDetails.tripCode;

                            let tripDate = tripDetails.plannedDate;

                            if (stage == 'enroute' || stage == 'ended') {
                                tripDate = tripDetails.actualDate;
                            }

                            tripDate = (tripDate || "").substr(0, 16);



                            return <Card style={{ margin: '25px', }}> <CardActions style={{ backgroundColor: (stage == 'enroute') ? 'rgba(255,203,203,0.8)' : (stage == 'ended' ? 'rgba(253,255,203,0.8)' :'rgba(100,250,203,0.8)') }}>
                                <div style={{color: 'red'}}> {stage == 'enroute' ? 'Current Trip' : ( stage == 'ended' ? 'Past Trip': 'Future Trip')} </div>
                                <Typography>
                              
                                &nbsp; {driver}   {pickup} to  {dropoff} on {tripDate}
                                    </Typography>
                                {stage == 'enroute' && <Button variant="contained" sx={{
                                    alignSelf: 'center',
                                    marginLeft: '40%',
                                    marginTop: '1%',

                                    marginBottom: '1%'
                                }} onClick={async () => {
                                    setCurrentTripCode(tripDetails.tripCode)
                                    getCurrentTrip();
                                }} >Double Tap to Refresh Details</Button>}
                            </CardActions>      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }} >
                                    {tripItems && tripItems.map(tripItem => {
                                        return <div sx={{ justifyContent: 'space-arround', padding: '10px' }}>
                                            <div style={styles.inforLet}>
                                                <span style={styles.heading}>
                                                    Type: &nbsp;
                                                </span>
                                                <span style={styles.para}>
                                                {tripItem.type}
                                                </span>
                          
                                            </div>
                                            <br />
                                            <span>
                                            <div style={styles.inforLet}>
                                                <span style={styles.heading}>
                                                    Chaisis: &nbsp;
                                                </span>
                                                <span style={styles.para}>
                                                {tripItem.vin}
                                                </span>
                          
                                            </div>
                                            </span>
                                            <br />
                                            <div style={styles.inforLet}>
                                                <span style={styles.heading}>
                                                    Client: &nbsp;
                                                </span>
                                                <span style={styles.para}>
                                                {tripItem.client}
                                                </span>
                          
                                            </div>
                                            <br />
                                            <div>
                                                Trip Code:   &nbsp; {tripCode}
                                            </div>
                                            { (stage == 'enroute' || stage == 'ended') && <Button>

                                                <a color="inherit" underline="always" href={"https://asia-southeast2-tawtripmanager.cloudfunctions.net/createTripReport?pin=" + tripItem.driverPin + "&&business=1&&tripName=" + tripItem.tripCode + "&&chasis=" + tripItem.vin} rel="noreferrer" target="_blank">Download Report</a>
                                            </Button>}
                                        </div>
                                    })}
                                </CardContent>


                                {currentTripCode && currentTrip && stage == 'enroute' && !_.isEmpty(points) &&

                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }} >

                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={center}
                                            zoom={15}
                                        >
                                            <InfoBox
                                                onLoad={onLoad}
                                                options={options}
                                                position={center}
                                            >
                                                <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 1 }}>
                                                    <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                                                        {"Truck"}
                                                        <img style={{ height: '25px' }} src={TruckImage}></img>
                                                    </div>
                                                </div>
                                            </InfoBox>
                                            <Circle
                                                // optional
                                                onLoad={onLoad}
                                                // required
                                                center={center}
                                                // required
                                                options={options}
                                            />
                                            <></>
                                        </GoogleMap>

                                        <div>
                                            <Typography sx={{ fontSize: 14 }} color="success" gutterBottom>
                                                Trip Complaince And Completion
                                            </Typography>
                                            {currentTrip.progress && currentTrip.progress <= 100 && <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                <CircularProgress variant="determinate" value={currentTrip?.progress} />
                                                <Box
                                                    sx={{
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,
                                                        position: 'absolute',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography variant="caption" component="div" color="secondary">
                                                        {currentTrip?.progress} %
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            }
                                            <Timeline        >
                                                {(points || []).map((point, index) => {

                                                    if (index > 2) {
                                                        return;
                                                    }
                                                    return (<TimelineItem key={index}>

                                                        <TimelineSeparator>
                                                            <TimelineDot color={index == (0) ? "success" : "secondary"} />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            {index == 0 && (<Typography color="green">
                                                                Current
                                                            </Typography>)}
                                                            <Typography>
                                                                {point.date}
                                                            </Typography>
                                                            <Typography>
                                                                {point.location}
                                                            </Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>)
                                                })}
                                            </Timeline>

                                        </div>

                                    </CardContent>}



                            </Card>;
                        }

                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}