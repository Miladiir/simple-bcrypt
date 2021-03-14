import {compareSync as bcryptCompare} from "bcrypt";

import {decode} from "./BMCF";

function compareSync(secret: string, hash: string | Buffer): boolean {
  const hashedSecret: string = hash instanceof Buffer ? decode(hash) : hash;

  return bcryptCompare(secret, hashedSecret);
}

export {compareSync};
