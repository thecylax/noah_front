import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function MyDatePicker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyy"
                placeholderText="Selecione uma data"
                className="form-control"
            />
        </div>
    )
}