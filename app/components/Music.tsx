"use client";

import { useState } from "react";
import CreateMusicModal from "../modals/CreateMusicModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { MusicModel } from "../types";

export function Music({editable, music}: {editable: boolean, music: MusicModel}) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<number>(0);

  const openModal = (id: number) => {
    setSelected(id);
    setShowModal(true);
  };

  const openConfirmModal = (id: number) => {
    setSelected(id);
    setConfirmModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmModal(false);
  };

  return (
    <>
      <div className="list-group-item border-0 bg-light bg-opacity-50 mb-1">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{music.title}</h5>
          { editable &&
            <small>
              <a href="#" className='p-2 text-dark bi-pencil' onClick={() => openModal(music.id)} />
              <a href="#" className='p-2 text-dark bi-trash3' onClick={() => openConfirmModal(music.id)} />
            </small>
          }
        </div>
        {music.singer
          ? <p className="mb-1">{music.singer}</p>
          : <p className="mb-1">--</p>
        }
        <small>
          <a href={music.youtube_link} target='_blank' className='p-2 text-danger bi-youtube' />
          <a href={music.cifra_link} target='_blank' className='p-2 text-dark bi-music-note-list' />
        </small>
        <CreateMusicModal showModal={showModal} closeModal={closeModal} musicId={selected} />
        <ConfirmDeleteModal showModal={showConfirmModal} closeModal={closeModal} itemId={selected} />
      </div>
    </>
  )
}
