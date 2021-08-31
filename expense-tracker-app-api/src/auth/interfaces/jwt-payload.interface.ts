import { ObjectID } from 'typeorm';

export interface IJwtPayload {
  username: string;
  sub: string | ObjectID;
}
