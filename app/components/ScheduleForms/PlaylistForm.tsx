"use client";

import { fetcher } from '@/app/helpers/fetcher';
import { MusicModel } from '@/app/types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';

export default function PlaylistF(props: any) {
  const { data, handleChange } = props;
  const [selectedOption, setSelectedOption] = useState<any[] | null>([]);
  const [musicsData, setMusicsData] = useState<MusicModel[]>([]);
  const { data: musics, error, isLoading } = useSWR<any>(`/api/musics/`, fetcher);

  useEffect(() => {
    if (musics && musics.result.results) {
      setMusicsData(musics.result.results)
    }
  }, [musics, isLoading]);

  const musicObjects = musicsData.map((music: MusicModel) => ({
    label: music.title,
    value: music.id
  }));

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text text-success bi-spotify" id="basic-addon1"></span>
        <input type="text" className="form-control" placeholder="Playlist no spotify" aria-label="Nome" name='playlist_spotify' value={data.playlist_spotify} onChange={handleChange} />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text w-25">Músicas</span>
        <Select
          name="playlist_musics"
          options={musicObjects}
          className="form-control p-0"
          isClearable={true}
          isSearchable={true}
          isMulti={true}
          placeholder="Selecione uma ou mais músicas."
          defaultValue={data.playlist_musics}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
