import { Team } from "./Team";

export class Schedule {
    id: number;
    name: string;
    datetime: Date;
    local: string;
    teams: Team[];
  
    constructor(id: number, name: string, datetime: Date, local: string, teams: Team[]) {
      this.id = id;
      this.name = name;
      this.datetime = new Date(datetime);
      this.local = local;
      this.teams = teams;
    }    
}
