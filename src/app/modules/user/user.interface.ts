
export interface TUser {
    id: string;
    password : string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: "in-progress" | "blocked";
    isDeleted : boolean;
}

/* export interface TNewUser {
    role : string;
    password: string;
    id : string;
} */