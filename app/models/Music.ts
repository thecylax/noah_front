export class Music {
    id: number;
    title: string;
    youtube_link: string;
    spotify_link: string;
    cifra_link: string;

    constructor(id: number, title: string, youtube_link: string, spotify_link: string, cifra_link: string) {
      this.id = id;
      this.title = title;
      this.youtube_link = youtube_link;
      this.spotify_link = spotify_link;
      this.cifra_link = cifra_link;
    }
}
