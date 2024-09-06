import Select from 'react-select';
import { MusicModel, PlaylistModel, ScheduleModel } from "../types";

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { validateUrl } from '../helpers/utils';

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  editable: boolean;
  playlist: PlaylistModel | null;
  schedule: ScheduleModel | undefined;
}

export function PlaylistModal({ showModal, closeModal, editable, playlist, schedule }: MyModalProps) {
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isMusicsValid, setIsMusicsValid] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [scheduleName, setScheduleName] = useState<string>(playlist?.name || '');
  const [musicsData, setMusicsData] = useState<MusicModel[]>([]);
  const [spotifyLink, setSpotifyLink] = useState<string | null>(playlist?.spotify_link || null);
  const [selectedMusics, setSelectedMusics] = useState(() => {
    return playlist?.musics?.map((music: MusicModel) => ({
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
    if (playlist?.musics) {
      setSelectedMusics(playlist.musics.map((music: MusicModel) => ({
        label: music.title,
        value: music.id
      })));
    } else {
      setSelectedMusics([]);
    }
    setScheduleName(playlist?.name || '');
    setSpotifyLink(playlist?.spotify_link || null);
  }, [playlist]);

  useEffect(() => {
    if (spotifyLink) {
      const isUrlValid = validateUrl(spotifyLink);
      if (!isUrlValid) {
        setUrlError('Link inválido!');
        setIsUrlValid(false);
      } else {
        setUrlError(null);
        setIsUrlValid(true);
      }
    } else {
      setIsUrlValid(false);
    }
  }, [spotifyLink]);

  useEffect(() => {
    if (selectedMusics.length > 0)
      setIsMusicsValid(true);
    else
      setIsMusicsValid(false);
  }, [selectedMusics])

  const musicObjects = musicsData.map((music: MusicModel) => ({
    label: music.title,
    value: music.id
  }));

  const handleChange = (selectedOptions: any) => {
    setSelectedMusics(selectedOptions || [])
  }

  const handleUrlChange = (e: any) => {
    setSpotifyLink(e.target.value);
    setIsUrlValid(false);
  };
  const closeModalX = () => {
    setSelectedMusics([]);
    setSpotifyLink(null);
    setScheduleName('');
    closeModal();
  };

  const formatPlaylist = () => {
    const payload = {
      "spotify_link": spotifyLink ? spotifyLink : null,
      "musics": selectedMusics?.map(m => m.value),
      "name": scheduleName
    }

    return payload;
  };

  const formatSchedule = (playlistId: number) => {
    const payload = {
      "name": schedule?.name,
      "datetime": schedule?.datetime,
      "teams": schedule?.teams.map(member => member.id),
      "local": schedule?.local,
      "playlist": playlistId || null
    }

    return payload;
  };

  const savePlaylist = async (e: any) => {
    e.preventDefault()

    if (selectedMusics.length != 0 || spotifyLink) {
      const formData = formatPlaylist();

      // salvar a playlist primeiro, e entao com o id retornado
      // atualizar o schedule
      let method = 'PUT';
      let url = `/data/playlist/${playlist?.id}`;
      let playlistId = 0;
      if (!playlist?.id) {
        method = 'POST';
        url = '/data/playlist/'
      }

      try {
        const res = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!res.ok) {
          console.log('Erro ao buscar playlists');
          console.log(await res.text());
        } else {
          const playlistData = await res.json();
          playlistId = playlistData.id;
        }
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      };

      // Atualiza schedule se a playlist foi criada!
      if (playlistId) {
        const formData = formatSchedule(playlistId);
        try {
          const res = await fetch(`/data/schedule/${schedule?.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (!res.ok) {
            console.log('Erro ao salvar schedule');
            console.log(await res.text());
          } else {
            const scheduleData = await res.json();
          }
        } catch (error) {
          console.error('Ocorreu um erro:', error);
        }
      }
      closeModalX();
    }
  }

  const isButtonDisabled = !isUrlValid || !isMusicsValid;

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
                <input
                  type="url"
                  className={`form-control ${urlError ? 'is-invalid' : isUrlValid ? 'is-valid' : ''}`}
                  placeholder="Link playlist Spotify"
                  aria-label="Nome"
                  aria-describedby="addon-wrapping"
                  value={spotifyLink || ''}
                  onChange={handleUrlChange}
                  required
                />
                {urlError && <div className="invalid-feedback">{urlError}</div>}
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
                required
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
