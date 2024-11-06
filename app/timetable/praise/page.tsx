'use client'

import { useState } from "react";
import { Schedules } from "@/app/components/Schedules"
import CreateScheduleModal from "@/app/modals/CreateScheduleModal";
import CreateScheduleModalSimplified from "@/app/modals/CreateScheduleModalSimplified";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const openModal = async () => {
    setShowModal(true);
    // setShowModal2(true);  // FUTURO!
  };

  const closeModal = () => {
    setShowModal(false);
    // setShowModal2(false);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a className="text-light " href="/">Início</a></li>
          <li className="breadcrumb-item text-light" aria-current="page">Louvor</li>
          <li className="breadcrumb-item active text-light" aria-current="page">Escala</li>
        </ol>
      </nav>
      <div className="d-flex w-100 justify-content-between">
        <span></span>
        <button type="button" className="btn btn-primary mb-2" onClick={openModal}>Adicionar</button>
      </div>

      <CreateScheduleModal showModal={showModal} closeModal={closeModal} />
      {/* <CreateScheduleModalSimplified showModal={showModal2} closeModal={closeModal} /> */}
      <Schedules />
    </>
  )
}