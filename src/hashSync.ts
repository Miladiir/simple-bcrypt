import { hashSync as bcryptHashSync } from "bcrypt";

import { BcryptSettings } from "./BcryptSettings";
import { encode } from "./BMCF";
import { Format } from "./Format";

/**
 * Hash synchronously using auto generated defaults.
 * @param secret The secret to hash.
 * @param outputFormat The desired output format.
 */
function hashSync(secret: Readonly<string>, outputFormat: Readonly<Format.String>): string;
function hashSync(secret: Readonly<string>, outputFormat: Readonly<Format.Binary>): Buffer;
function hashSync(secret: Readonly<string>, outputFormat: Readonly<Format>): string | Buffer {
    const settings: BcryptSettings = BcryptSettings.get();
    const hashedSecret: string = bcryptHashSync(secret, settings.saltRounds);
    switch (outputFormat) {
        case Format.String:
            return hashedSecret;
        case Format.Binary:
            return encode(hashedSecret);
        default:
            throw Error(`Invalid format: ${outputFormat}`);
    }
}

export { hashSync };
