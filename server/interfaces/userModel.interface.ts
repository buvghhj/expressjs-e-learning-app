import { Document } from "mongoose";

export interface IUser extends Document {

    name: string;

    email: string;

    password: string;

    avatar: {

        public_id: string

        url: string

    };

    role: string;

    isVerified: boolean;

    courses: Array<{ coursesId: string }>;

    comparePassword: (password: string) => Promise<boolean>;

    SignAccessToken: () => string;

    SignRefreshToken: () => string

}
