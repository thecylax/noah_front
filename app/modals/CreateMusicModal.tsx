'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '../helpers/fetcher';
import useSWR from 'swr';

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  musicId: number;
}

const CreateMusicModal = ({ showModal, closeModal, musicId }: MyModalProps) => {
  const router = useRouter()
  const modalClass = showModal ? 'modal fade show' : 'modal fade';
  const [title, setTitle] = useState<string>('');
  const [singer, setSinger] = useState<string>('');
  const [ytLink, setYTLink] = useState<string>('');
  const [ccLink, setCCLink] = useState<string>('');
  const { data, error, isLoading } = useSWR<any>(musicId ? `/data/musics/${musicId}/` : null, fetcher);


  useEffect(() => {
    if (musicId && data) {
      setTitle(data.title);
      setSinger(data.singer);
      setYTLink(data.youtube_link);
      setCCLink(data.cifra_link);
    }
  }, [data, isLoading, musicId]);

  const closeModal2 = () => {
    closeModal();
    clearFields();
  }

  const clearFields = () => {
    setTitle('');
    setSinger('');
    setYTLink('');
    setCCLink('');
  }

  const saveMusic = async (e: any) => {
    // const [add] = context();
    e.preventDefault()
    if (title != "") {
      const formData = {
        title: title,
        singer: singer,
        youtube_link: ytLink,
        cifra_link: ccLink
      }
      let res = null;
      if (musicId) {
        res = await fetch(`/data/musics/${musicId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        res = await fetch('/data/musics/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      // if (res.status > 0) {
      //   router.push('/teste/');
      // }
      closeModal();
      clearFields();
    }
  };

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            {musicId
              ? <h5 className="modal-title text-white">Editar Música</h5>
              : <h5 className="modal-title text-white">Adicionar Música</h5>
            }
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>

          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="addon-wrapping">@</span>
              <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="addon-wrapping" value={title} onChange={(e: any) => setTitle(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text bi-mic" id="addon-wrapping" />
              <input type="text" className="form-control" placeholder="Cantor/Grupo" aria-label="Cantor" aria-describedby="addon-wrapping" value={singer} onChange={(e: any) => setSinger(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text text-danger bi-youtube" id="addon-wrapping" />
              <input type="text" className="form-control" placeholder="Link YouTube" aria-label="YouTube" aria-describedby="addon-wrapping" value={ytLink} onChange={(e: any) => setYTLink(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text bi-music-note-list" id="addon-wrapping" />
              <input type="text" className="form-control" placeholder="Link Cifra" aria-label="Cifra" aria-describedby="addon-wrapping" value={ccLink} onChange={(e: any) => setCCLink(e.target.value)} />
            </div>
          </div>

          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModal2}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={saveMusic}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMusicModal;
