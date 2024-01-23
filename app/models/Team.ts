import { Ministry } from "./Ministry";
import { User } from "./User";

export class Team {
    id: number;
    name: string;
    ministry: Ministry;
    members: User[];
  
    constructor(id: number, name: string, ministry: Ministry, members: User[]) {
      this.id = id;
      this.name = name;
      this.ministry = ministry;
      this.members = members;
    }    
}
