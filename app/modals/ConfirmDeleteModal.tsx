interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  itemId: number;
}

const ConfirmDeleteModal = ({ showModal, closeModal, itemId }: MyModalProps) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  const confirm = async (e: any) => {
    e.preventDefault()
    if (itemId) {
      const res = await fetch(`/data/musics/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.status > 0) {
        closeModal();
      }
    };
  };

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
              <h5 className="modal-title text-light">Remoção</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>

          <div className="modal-body text-light">
            <strong>
              Tem certeza que deseja apagar este item?
            </strong>
          </div>

          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={confirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
