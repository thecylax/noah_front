import { ptBR } from 'date-fns/locale/pt-BR';
import React from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainForm from '../components/ScheduleForms/Main';
registerLocale('ptBR', ptBR);

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const CreateScheduleModal: React.FC<MyModalProps> = ({ showModal, closeModal }) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  return (
    <>
      <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark bg-opacity-50">
              <h5 className="modal-title text-white">Adicionar nova escala</h5>
              <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
            </div>
            <div className="modal-body">
              <MainForm closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateScheduleModal;
