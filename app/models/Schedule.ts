import { Team } from "./Team";

export class Schedule {
    id: number;
    name: string;
    datetime: Date;
    local: string;
    teams: Team[];
    playlist: number;

    constructor(id: number, name: string, datetime: Date, local: string, teams: Team[], playlist: number) {
      this.id = id;
      this.name = name;
      this.datetime = new Date(datetime);
      this.local = local;
      this.teams = teams;
      this.playlist = playlist;
    }
}
