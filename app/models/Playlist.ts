import { Music } from "./Music";

export class Playlist {
    id: number;
    name: string;
    musics: Music[];

    constructor(id: number, name: string, musics: Music[]) {
      this.id = id;
      this.name = name;
      this.musics = musics;
    }
}
