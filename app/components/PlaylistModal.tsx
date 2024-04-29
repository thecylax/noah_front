import React from 'react';
import { PlaylistModel } from "../types";

import { Music } from "../components/Music"

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  parameter: PlaylistModel | null;
}

const ShowPlaylistModal: React.FC<MyModalProps> = ({ showModal, closeModal, parameter }) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';
  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            <h5 className="modal-title text-white">
              <div>
                Playlist
                {parameter &&
                  <a href={parameter.spotify_link} target='_blank' className='p-2 text-success bi-spotify' />
                }
              </div>
            </h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>
          <div className="modal-body">
            {parameter && (
            <div className="list-group">
              {parameter.musics.map(music => (
                <Music key={music.id} editable={false} music={music} />
              ))}
            </div>
            )}
          </div>
          <div className="modal-footer bg-dark bg-opacity-50">
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
