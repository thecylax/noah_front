export interface MusicModel {
    id: number;
    title: string;
    singer: string;
    youtube_link: string;
    cifra_link: string;
}

export interface UserModel {
    id: number;
    username: string;
    email: string;
    groups: string[];
    role: string;
}

export interface MinistryModel {
    id: number;
    name: string;
    users: UserModel[];
}

export interface TeamModel {
    id: number;
    name: string;
    ministry: MinistryModel;
    members: UserModel[];
}

export interface ScheduleModel {
    id: number;
    name: string;
    datetime: string;
    local: string;
    teams: TeamModel[];
    playlist: number;
}

export interface PlaylistModel {
    id: number;
    name: string;
    spotify_link: string;
    musics: MusicModel[];
}
