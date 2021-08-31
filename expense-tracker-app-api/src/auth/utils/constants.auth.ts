export class AuthConstants {
  public static readonly USERNAME_REGEX: RegExp = /(^[a-zA-Z0-9_]+$)/;

  public static readonly PASSWORD_REGEX: RegExp = /(^[a-zA-Z0-9_@]+$)/;

  // TODO: Handle some kind of error handling when env variable does not exists. Check this in all the env variables in different files as well!!!
  public static readonly JWT_SECRET: string =
    process.env.JWT_SECRET || 'test_jwt_secret';
}
