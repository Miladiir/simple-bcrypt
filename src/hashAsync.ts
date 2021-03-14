import {hash} from "bcrypt";

import {BcryptSettings} from "./BcryptSettings";
import {encode} from "./BMCF";
import {Format} from "./Format";

/**
 * Hash asynchronously using auto generated defaults.
 * @param secret The secret to hash.
 * @param outputFormat The desired output format.
 */
async function hashAsync(
  secret: string,
  outputFormat: Format.String,
): Promise<string>;
async function hashAsync(
  secret: string,
  outputFormat: Format.Binary,
): Promise<Buffer>;
async function hashAsync(
  secret: string,
  outputFormat: Format,
): Promise<string | Buffer> {
  const settings: BcryptSettings = BcryptSettings.get();
  const hashedSecret: string = await hash(secret, settings.saltRounds);
  switch (outputFormat) {
    case Format.String:
      return hashedSecret;
    case Format.Binary:
      return encode(hashedSecret);
    default:
      throw new Error(`Unknown output format: ${outputFormat}`);
  }
}

export {hashAsync};
