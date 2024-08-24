import Select from 'react-select';
import { MusicModel, PlaylistModel } from "../types";

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
  const [spotifyLink, setSpotifyLink] = useState<string>(parameter?.spotify_link || '');
  const [hasPlaylist, setHasPlaylist] = useState<boolean>(false);
  const [selectedMusics, setSelectedMusics] = useState(() => {
    return parameter?.musics?.map((music: MusicModel) => ({
      label: music.title,
      value: music.id
    })) || []
  });
  const { data: musics, error, isLoading } = useSWR<any>(`/data/musics/`, fetcher);
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  useEffect(() => {
    if (musics?.result?.results) {
      setMusicsData(musics.result.results)
    }
  }, [musics, isLoading]);

  useEffect(() => {
    if (parameter?.musics) {
      setSelectedMusics(parameter.musics.map((music: MusicModel) => ({
        label: music.title,
        value: music.id
      })));
    } else {
      setSelectedMusics([]);
    }
    setSpotifyLink(parameter?.spotify_link || '')

  }, [parameter]);

  const musicObjects = musicsData.map((music: MusicModel) => ({
    label: music.title,
    value: music.id
  }));

  const handleChange = (selectedOptions: any) => {
    setSelectedMusics(selectedOptions || [])
  }

  const closeModalX = () => {
    setSelectedMusics([]);
    setSpotifyLink('');
    console.log(hasPlaylist);
    closeModal();
  };

  const formatPlaylist = () => {
    const payload = {
      "spotify_link": spotifyLink,
      "musics": selectedMusics?.map(m => m.value),
    }

    return payload;
  };

  const savePlaylist = async (e: any) => {
    e.preventDefault()
    console.log(selectedMusics);
    console.log(spotifyLink);
    setHasPlaylist(false);
    if (selectedMusics.length != 0 || spotifyLink)
      setHasPlaylist(true);

    if (selectedMusics.length != 0) {
      const formData = formatPlaylist();
      console.log(formData);
      // Mas preciso identificar se já existe a playlist
      // salvar a playlist primeiro, e entao com o id retornado
      // salvar o schedule

      // try {
      //   const res = await fetch('/data/playlist/', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(formData)
      //   });
      //   const playlistData = await res.json();
      //   playlistId = playlistData.id;
      // } catch (error) {
      //     console.error('Ocorreu um erro:', error);
      // };

    }
  }

  const isButtonDisabled = spotifyLink.trim() === '' && selectedMusics.length === 0;

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            <h5 className="modal-title text-white">
              <div>
                Playlist
              </div>
            </h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModalX} />
          </div>
          <div className="modal-body">
            <div className="list-group">
              <div className="input-group mb-3">
                <span className="input-group-text bi-spotify text-success" id="addon-wrapping"></span>
                <input type="text" className="form-control" placeholder="Link playlist Spotify" aria-label="Nome" aria-describedby="addon-wrapping" value={spotifyLink} onChange={(e: any) => setSpotifyLink(e.target.value)} />
              </div>

              <Select
                name="playlist_musics"
                options={musicObjects}
                className="form-control p-0"
                isClearable={true}
                isSearchable={true}
                isMulti={true}
                placeholder="Selecione uma ou mais músicas."
                value={selectedMusics}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModalX}>Fechar</button>
            <button type="button" className="btn btn-primary" disabled={isButtonDisabled} onClick={savePlaylist}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
