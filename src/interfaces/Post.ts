export interface IPost {
    id: string;
    profilePic: string;
    images: {
        src: string;
        type: boolean;
    }[];
    hashtags: string[];
    name: string;
    desc: string;
    user_id: string;
}

export interface IUserProfile {
    id: string;
    created_at: string;
    name: string;
    bio: string;
    profile_pic: string;
    cover_pic: string;
  }
  
export interface IPostProfile {
    type: boolean;
    count: number;
    pic: string;
    desc: string;
}
