export class User {
    id: number;
    username: string;
    email: string;
    groups: string[];
  
    constructor(id: number, username: string, email: string, groups: string[]) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.groups = groups;
    }    
}
