import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

function Calendar({ onChange }) {
    const [value, setValue] = useState(dayjs());
    const handleChange = (newDate) => {
        setValue(newDate);
        // Format date as 'YYYY-MM-DD'
        if (onChange) {
            onChange(newDate.format('YYYY-MM-DD'));
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Birthday"
                value={value}
                onChange={handleChange}
                inputFormat="YYY-YMM-DD"
            />
        </LocalizationProvider>
    );
}

export default Calendar;