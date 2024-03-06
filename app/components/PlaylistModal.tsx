import React from 'react';
import { Playlist } from '../models/Playlist';

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  parameter: Playlist | null;
}

const ShowPlaylistModal: React.FC<MyModalProps> = ({ showModal, closeModal, parameter }) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';
  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Playlist</h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>
          <div className="modal-body">
            {parameter && (
              <ul className="list-group">
                {parameter.musics.map(music => (
                  <li key={music.id} className="list-group-item list-group-item-action d-flex">
                    <div className='p-2 flex-grow-1'>{music.title}</div>
                    <a href={music.youtube_link} target='_blank' className='p-2 text-danger bi-youtube' />
                    <a href={music.spotify_link} target='_blank' className='p-2 text-success bi-spotify' />
                    <a href={music.cifra_link} target='_blank' className='p-2 text-dark bi-music-note-list' />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPlaylistModal;
