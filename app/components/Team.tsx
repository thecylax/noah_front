"use client";

import { useState } from "react";
import CreateMusicModal from "../modals/CreateMusicModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { TeamModel } from "../types";
// import CreateTeamModal from "../modals/CreateTeamModal";

export function Team({ editable, team }: { editable: boolean, team: TeamModel }) {
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
          <h5 className="mb-1">{team.name}</h5>
          {editable &&
            <small>
              <a href="#" className='p-2 text-dark bi-pencil' onClick={() => openModal(team.id)} />
              <a href="#" className='p-2 text-dark bi-trash3' onClick={() => openConfirmModal(team.id)} />
            </small>
          }
        </div>
        <div className="d-flex w-100 justify-content-evenly">
          {/* <small> */}
            {team.members.map(member => (
              <span key={member.role} className="mt-1 badge rounded-pill text-bg-primary">{member.username}</span>
            ))}
          {/* </small> */}
        </div>
        {/* <p className="mb-1">{team.ministry}</p> */}
        {/* <small>
          <a href="#" target='_blank' className='p-2 text-danger bi-youtube' />
          <a href="#" target='_blank' className='p-2 text-dark bi-music-note-list' />
        </small> */}
        {/* <CreateTeamModal showModal={showModal} closeModal={closeModal} teamId={selected} /> */}
        <ConfirmDeleteModal showModal={showConfirmModal} closeModal={closeModal} itemId={selected} />
      </div>
    </>
  )
}
