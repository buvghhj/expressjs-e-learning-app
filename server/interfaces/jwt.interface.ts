export interface ITokenOptions {

    expires: Date

    maxAge: number

    httpOnly: boolean

    samSite: 'lax' | 'strict' | 'none' | undefined

    secure?: boolean

}