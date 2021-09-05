export class AppConstants {
  public static readonly IS_PRODUCTION: boolean =
    process.env.mode === 'production';

  public static readonly DEVELOPMENT_CLIENT_URL: string =
    'http://localhost:8080';

  public static readonly PRODUCTION_CLIENT_URL: string =
    'https://expense-tracker-app.vercel.app';
}
