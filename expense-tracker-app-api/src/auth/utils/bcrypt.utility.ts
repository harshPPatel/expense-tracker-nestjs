import * as bcrypt from 'bcrypt';

// TODO: Handle constants bit better than this. Does this fall under authconstants?
export class BcryptUtility {
  private readonly saltOrRounds = Number(process.env.NUMBER_OF_SALTS);

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  public async isMatched(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
