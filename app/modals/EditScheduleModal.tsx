import DatePicker from 'react-datepicker';
import { ScheduleModel } from "../types";

import { useEffect, useState } from 'react';


interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  scheduleData: ScheduleModel;
}

interface State {
  name: string;
  datetime: Date;
  local: string;
}

export function ScheduleModal({ showModal, closeModal, scheduleData }: MyModalProps) {
  const [schedule, setSchedule] = useState<ScheduleModel>(scheduleData);
  const [form, setForm] = useState<State>({ name: scheduleData.name, datetime: new Date(scheduleData.datetime), local: scheduleData.local });
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  useEffect(() => {
    if (scheduleData) {
      setSchedule(scheduleData);
      setForm({ name: scheduleData.name, datetime: new Date(scheduleData.datetime), local: scheduleData.local })
    }
  }, [scheduleData]);

  const handleChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({
      name: schedule.name,
      datetime: new Date(schedule.datetime),
      local: schedule.local
    })
  }

  const closeModalX = () => {
    resetForm();
    closeModal();
  };

  const formatSchedule = () => {
    const payload = {
      "name": form.name,
      "datetime": form.datetime,
      "teams": schedule.teams.map(member => member.id),
      "local": form.local,
      "playlist": schedule.playlist
    }

    return payload;
  };

  const saveSchedule = async (e: any) => {
    e.preventDefault()
    const formData = formatSchedule();
    try {
      const res = await fetch(`/data/schedule/${schedule.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        console.log('Erro ao salvar schedule');
        console.log(await res.text());
      } else {
        const schedule = await res.json();
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
    closeModalX();
  }

  const isButtonDisabled = !form.name || !form.datetime;

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            <h5 className="modal-title text-white">
              <div>
                Escala
              </div>
            </h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModalX} />
          </div>
          <div className="modal-body">
            <div className="list-group">
              <div className="input-group mb-3">
                <span className="input-group-text" id="addon-wrapping">@</span>
                <input
                  type="text"
                  className="form-control"
                  name='name'
                  placeholder="Nome"
                  aria-label="Nome"
                  aria-describedby="addon-wrapping"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2"><i className="bi bi-calendar" /></span>
                <DatePicker
                  locale={'ptBR'}
                  className='form-control'
                  value={new Date(form.datetime).toLocaleDateString()}
                  dateFormat={"P p"}
                  name='datetime'
                  onChange={(date: Date) => setForm({...form, datetime: date})}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon4"><i className="bi bi-map" /></span>
                <input
                  type="text"
                  name="local"
                  className="form-control"
                  placeholder="Local"
                  aria-label="Local"
                  value={form.local}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModalX}>Fechar</button>
            <button type="button" className="btn btn-primary" disabled={isButtonDisabled} onClick={saveSchedule}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
