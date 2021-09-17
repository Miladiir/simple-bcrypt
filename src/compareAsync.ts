import { compare } from "bcrypt";

import { decode } from "./BMCF";

async function compareAsync(secret: string, hash: string | Buffer): Promise<boolean> {
    const hashedSecret: string = hash instanceof Buffer ? decode(hash) : hash;

    return compare(secret, hashedSecret);
}

export { compareAsync };
