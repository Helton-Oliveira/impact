export interface ILoginRequest {
    email?: string,
    password?: string,
}

export interface ILoginResponse {
    token?: string,
    refreshToken?: string
}

export class LoginRequest implements ILoginRequest {
    public readonly email?: string;
    public readonly password?: string;
}

export class LoginResponse implements ILoginResponse {
    public readonly accessToken?: string
    public readonly refreshToken?: string
}