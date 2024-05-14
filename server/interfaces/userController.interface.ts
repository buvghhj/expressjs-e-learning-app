export interface IRegistrationBody {

    name: string;

    email: string;

    password: string;

    avatar?: string;

}

export interface IActivationToken {

    token: string;

    activationCode: string;

}

export interface IActivationRequest {

    activation_code: string

    activation_token: string

}

export interface ILoginRequest {

    email: string

    password: string

}

export interface ISocialAuthBody {

    email: string

    name: string

    avatar: string

}

export interface IUpdateUserBody {

    name?: string

    email?: string

}

export interface IUpdatePassword {

    oldPassword: string

    newPassword: string

}

export interface IUpdateAvatar {

    avatar: string

}