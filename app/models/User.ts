export class User {
    id: number;
    username: string;
    email: string;
    groups: string[];
    role: string;

    constructor(id: number, username: string, email: string, groups: string[], role: string) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.groups = groups;
      this.role = role;
    }
}
