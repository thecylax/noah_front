import { Music } from "./Music";

export class Playlist {
    id: number;
    name: string;
    spotify_link: string;
    musics: Music[];

    constructor(id: number, name: string, spotify_link: string, musics: Music[]) {
      this.id = id;
      this.name = name;
      this.spotify_link = spotify_link;
      this.musics = musics;
    }
}
