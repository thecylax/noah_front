import { ptBR } from 'date-fns/locale/pt-BR';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const CreateScheduleModalSimplified: React.FC<MyModalProps> = ({ showModal, closeModal }) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  const handleChange = () => {

  };

  return (
    <>
      <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark bg-opacity-50">
              <h5 className="modal-title text-white">Criar nova escala</h5>
              <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" name='schedule_name' onChange={handleChange} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2"><i className="bi bi-calendar" /></span>
                <DatePicker locale={'ptBR'} className='form-control w-100' dateFormat={"P p"} showTimeSelect name='schedule_datetime' onChange={handleChange} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon4"><i className="bi bi-map" /></span>
                <input type="text" className="form-control" placeholder="Local" aria-label="Local" name="schedule_local" onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer bg-dark bg-opacity-50">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Fechar
              </button>
              <button type="button" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateScheduleModalSimplified;
