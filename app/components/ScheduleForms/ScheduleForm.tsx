
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ScheduleF(props: any) {
  const { data, handleChange } = props;
  const [datetime, setDatetime] = useState<Date | null>(new Date());

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" name='schedule_name' value={data.schedule_name} onChange={handleChange} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2"><i className="bi bi-calendar" /></span>
        <DatePicker locale={'ptBR'} className='form-control' selected={data.schedule_datetime} dateFormat={"P p"} showTimeSelect name='schedule_datetime' value={data.schedule_datetime} onChange={handleChange} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon4"><i className="bi bi-map" /></span>
        <input type="text" className="form-control" placeholder="Local" aria-label="Local" name="schedule_local" value={data.schedule_local} onChange={handleChange} />
      </div>
    </>
  )
}
