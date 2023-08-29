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
import Arrow from 'react-arrow'

const _ = require("underscore");

const cssStyle = {
    labels: {
        marginTop: 5
    }
};

const containerStyle = {
    width: '70vw',
    height: '40vh'
};

const cent = {
    lat: -3.745,
    lng: -38.523
};

export default function FreightVIew(
    props
) {

    const chasis = props.chasis;
    const route = props.route;
    const plannedDate = props.plannedDate;
    const actualDate = props.actualDate;
    const status = props.status;
    const truck = props.truck;
    const stage = props.stage;
    const driver = props.driver;
    const tripCode = props.tripCode;
    const type = props.type;
    const [points, setPoints] = React.useState([]);
    const [trip, setTrip] = React.useState([]);
    const [headerBackgroundColor, setHeaderBackgroundColor] = React.useState(stage == "enroute" ? 'rgba(250,250,210,0.5)' : 'rgba(220,220,210,0.5)');
    const [map, setMap] = React.useState(null);
    const [center, setCenter] = React.useState(cent);
    const [showDetails, setShowDetails] = React.useState(false);

    const options = { closeBoxURL: '', enableEventPropagation: true };

    const onLoad = infoBox => {
        console.log('infoBox: ', infoBox)
    };

    const MINUTE_MS = 20 * 60000;

    React.useEffect(() => {
        const interval = setInterval(() => {
            getTrip();
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    async function getTrip() {
        let response = await fetch("https://asia-southeast2-tawtripmanager.cloudfunctions.net/getTrackPosts?tripCode=" + tripCode, {
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

        setTrip(details.trip);

        let points = Object.values(details.track.points);


        points = points.reverse();


        if (points && points[0] && points[0].latLong) {
            let latLong = points[0].latLong;
            setCenter({ lat: latLong.latitude, lng: latLong.longitude });
        }

        setPoints(points);

    }


    const handleChange = (panel) => async (event, isExpanded) => {
        if (isExpanded) {
            setHeaderBackgroundColor('rgba(210,250,210,1)');
            await getTrip();
        } else {
            setHeaderBackgroundColor(stage == "enroute" ? 'rgba(250,250,210,0.5)' : 'rgba(220,220,210,0.5)');
        }
    };

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
                    <Stack alignItems="space-arround">
                        <Stack sx={{ marginLeft: 3 }} direction="row" spacing={1}>
                            <Chip label={type + " :" + chasis} color="primary" />
                            <Chip label={"" + stage}  />
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                            <Chip label={(route.split("to"))[0]} color="default" />
                            <Arrow
                                direction="right"
                                shaftWidth={10}
                                shaftLength={100}
                                headWidth={30}
                                headLength={15}
                                fill="transparent"
                                stroke="orange"

                                strokeWidth={2}
                                onClick={() => alert('You clicked the arrow!')}
                            />
                                <Chip label={(route.split("to"))[1]} color="default" />
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    {trip && !_.isEmpty(trip) && (<div style={{ dsiplay: "flex", flexFlow: "row no-wrap", justifyContent: "space-between" }}>
                        <div >
                            <span>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                    <CardContent flexDirection="row" >

                                        <Typography sx={{ fontSize: 14 }} color="success" gutterBottom>
                                            Truck        <Chip label={truck} color="default" />
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="success" gutterBottom>
                                            Driver:  <Chip label={driver} color="success" />
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="success" gutterBottom>
                                            Trip Complaince And Completion
                                        </Typography>
                                        {trip.progress && trip.progress <= 100 && <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress variant="determinate" value={trip?.progress} />
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
                                                    {trip?.progress} %
                                                </Typography>
                                            </Box>
                                        </Box>}
                                        <Typography sx={{ mb: 1.5 }} color="secondary">
                                            Trip Code {trip?.tripCode}
                                        </Typography>
                                        <Button>

                                            <a color="inherit" underline="always" href={"https://asia-southeast2-tawtripmanager.cloudfunctions.net/createTripReport?pin=" + trip.pin + "&&business=1&&tripName=" + trip.name + "&&chasis=" + chasis} rel="noreferrer" target="_blank">Download Trip Report</a>
                                        </Button>

                                    </CardContent>

                                    <CardContent>

                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={center}
                                            zoom={10}
                                        >
                                            <InfoBox
                                                onLoad={onLoad}
                                                options={options}
                                                position={center}
                                            >
                                                <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 1 }}>
                                                    <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                                                        {type + " : " + chasis}
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

                                    </CardContent>


                                </Card>


                            </span>
                        </div>
                        <Button variant="outlined" sx={{
                            alignSelf: 'center',
                            marginLeft: '40%',
                            marginTop: '1%',

                            marginBottom: '1%'
                        }} onClick={async () => {
                            setShowDetails(showDetails ? false : true)
                        }} >{!showDetails ? 'Show History' : 'Hide History'}</Button>
                        <div style={{ dsiplay: "flex", flexDirection: "column", width: "100%" }}>
                            <Timeline        >
                                {(points || []).map((point, index) => {

                                    if (!showDetails && index > 0) {
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
                        <Button variant="contained" sx={{
                            alignSelf: 'center',
                            marginLeft: '40%',
                            marginTop: '1%',
                            marginBottom: '1%'
                        }} onClick={async () => {
                            getTrip()
                        }} >Refresh</Button>

                    </div>)}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}