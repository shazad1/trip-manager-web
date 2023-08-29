import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
export default function PlannedDate(props) {

  const onDateChange = props.onDateChange;
  const selectedDate = props.selectedDate;

  const [value, setValue] = React.useState(selectedDate || new Date());

  return (

    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justtifyCOntent: 'center',
        alignItems: 'center',
    }}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onDateChange(newValue);
        }}
      />
    </LocalizationProvider>
    </Box>

  );
}