export class AuthConstants {
  public static readonly USERNAME_REGEX: RegExp = /(^[a-zA-Z0-9_]+$)/;

  public static readonly PASSWORD_REGEX: RegExp = /(^[a-zA-Z0-9_@]+$)/;
}
