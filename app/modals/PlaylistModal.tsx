import Select from 'react-select';
import { MusicModel, PlaylistModel } from "../types";

import { Music } from "../components/Music";
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  editable: boolean;
  parameter: PlaylistModel | null;
}

export function PlaylistModal({ showModal, closeModal, editable, parameter }: MyModalProps) {
  const [musicsData, setMusicsData] = useState<MusicModel[]>([]);
  const { data: musics, error, isLoading } = useSWR<any>(`/data/musics/`, fetcher);
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  const foo = [{
    label: "music.title",
    value: "music.id"
  }];

  useEffect(() => {
    if (musics && musics.result.results) {
      setMusicsData(musics.result.results)
    }
  }, [musics, isLoading]);

  const musicObjects = musicsData.map((music: MusicModel) => ({
    label: music.title,
    value: music.id
  }));

  const handleChange = (event: any) => {
    console.log(event)
  }

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            <h5 className="modal-title text-white">
              <div>
                PlaylistX
                {parameter &&
                  <a href={parameter.spotify_link} target='_blank' className='p-2 text-success bi-spotify' />
                }
              </div>
            </h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>
          <div className="modal-body">
            <div className="d-flex w-100 justify-content-between">
              <span></span>
              <button type="button" className="btn btn-primary mb-2">Adicionar</button>
            </div>
              {parameter && (
                <div className="list-group">
                  <div className="input-group mb-3">
                    <span className="input-group-text bi-spotify text-success" id="addon-wrapping"></span>
                    <input type="text" className="form-control" placeholder="Link playlist Spotify" aria-label="Nome" aria-describedby="addon-wrapping" value={parameter.spotify_link} onChange={(e: any) => setTitle(e.target.value)} />
                  </div>

                  <Select
                    name="playlist_musics"
                    options={musicObjects}
                    className="form-control p-0"
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Selecione uma ou mais músicas."
                    defaultValue={foo}
                    onChange={handleChange}
                  />

                  {parameter.musics.map(music => (
                    <>
                      <div className="row">
                        <div className="col-11">
                          <Music key={music.id} editable={false} music={music} />
                        </div>
                        <div className="col-1 p-0">
                          <a href="#" className='text-light bi-x-circle fs-3'></a>
                        </div>
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="addon-wrapping">Música</span>
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="addon-wrapping" value="title" onChange={(e: any) => setTitle(e.target.value)} />
                      </div>

                    </>
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
