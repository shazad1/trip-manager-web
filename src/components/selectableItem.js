import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SelectableItem(props) {
  const selected = props.selected;
  const onSelected = props.onSelected;
  const ids = props.ids;


  return (
    <Card sx={{ minWidth: 175, maxHeight: 150, marginBottom: '1%',
      backgroundColor: selected ? '#e4581e' : '#D0D4D7'
    }} onClick = {()=> {if (onSelected) {onSelected(ids ,selected ? false : true)}}}>
      <CardContent>
        <Typography sx={{ 
          fontSize: 14,
          color: selected ? "white" : "black"
        
        }}  gutterBottom>
          {props.subHeading1}
        </Typography>
        <Typography variant="h5" component="div"  sx={{ mb: 1.5,           color: selected ? "white" : "black" }}>
          {props.heading}
        </Typography>
        <Typography sx={{ mb: 1.5,           color: selected ? "white" : "black" }} >
         {props.subHeading2}
        </Typography>
        <Typography variant="body2"  sx={{ mb: 1.5,           color: selected ? "white" : "black" }}>
          {props.details}
        </Typography>
        <Typography variant="body2"  sx={{ mb: 1.5,           color: selected ? "white" : "black" }}>
          {props.details2}
        </Typography>
        {props.image ? (<img style={{maxHeight: 120}} src = {props.image}/>) : null}
      </CardContent>
    </Card>
  )
}