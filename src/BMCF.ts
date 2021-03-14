// tslint:disable

export function encode(mcf: string): Buffer {
  const match = safeRegex(mcf);
  let headerOctet: number = encodeScheme(match.scheme);
  headerOctet += Number(match.cost);
  const buffer: Buffer = Buffer.alloc(40);
  buffer.writeUInt8(headerOctet, 0);
  const saltAsBase64: string = bcryptToNormal(match.salt);
  buffer.fill(saltAsBase64, 1, 17, "base64");
  const digestAsBase64: string = bcryptToNormal(match.digest);
  buffer.fill(digestAsBase64, 17, undefined, "base64");

  return buffer;
}

export function decode(bmcf: Buffer) {
  const headerOctet = bmcf.readInt8(0);
  const scheme = (headerOctet & 0b1110_0000) as 32 | 64 | 96 | 128 | 160;
  const decodedScheme = decodeScheme(scheme);
  const cost = headerOctet & 0b0001_1111;
  const decodedCost = cost < 10 ? "0" + cost : cost.toString();
  const saltAsBase64 = bmcf.toString("base64", 1, 17).substr(0, 22);
  const salt = normalToBcrypt(saltAsBase64);
  const digestAsBase64 = bmcf.toString("base64", 17).substr(0, 31);
  const digest = normalToBcrypt(digestAsBase64);
  return `$${decodedScheme}$${decodedCost}$${salt}${digest}`;
}

function encodeScheme(scheme: "2" | "2a" | "2b" | "2x" | "2y") {
  switch (scheme) {
    case "2":
      return 0b0010_0000;
    case "2a":
      return 0b0100_0000;
    case "2b":
      return 0b0110_0000;
    case "2x":
      return 0b1000_0000;
    case "2y":
      return 0b1010_0000;
  }
}

function decodeScheme(code: 32 | 64 | 96 | 128 | 160) {
  switch (code) {
    case 32:
      return "2";
    case 64:
      return "2a";
    case 96:
      return "2b";
    case 128:
      return "2x";
    case 160:
      return "2y";
  }
}

function safeRegex(input: string) {
  const regex: RegExp = new RegExp(
    "^[$](?<scheme>2[abxy]?)[$](?<cost>(0[4-9]|[12][0-9]|3[01]))[$]((?<salt>[./0-9a-zA-Z]{22})(?<digest>[./0-9a-zA-Z]{31}))$",
  );
  const match: RegExpMatchArray | null = input.match(regex);
  if (match === null || match.groups === undefined) {
    throw Error();
  }
  const scheme = match.groups["scheme"] as "2" | "2a" | "2b" | "2x" | "2y";
  if (scheme === undefined || scheme.length === 0 || scheme.length > 2) {
    throw Error();
  }
  const cost = Number(match.groups["cost"]);
  if (!Number.isFinite(cost) || cost < 4 || cost > 31) {
    throw Error();
  }
  const salt = match.groups["salt"];
  if (salt === undefined || salt.length !== 22) {
    throw Error();
  }
  const digest = match.groups["digest"];
  if (digest === undefined || digest.length !== 31) {
    throw Error();
  }

  return {
    scheme,
    cost,
    salt,
    digest,
  };
}

function bcryptToNormal(input: string): string {
  let output = "";
  for (const character of input) {
    const num = CHARS_BCRYPT_REVERSE[character]!;
    output += CHARS_BASE64.charAt(num);
  }

  return output;
}

function normalToBcrypt(input: string): string {
  let output = "";
  for (const character of input) {
    const num = CHARS_BASE64_REVERSE[character]!;
    output += CHARS_BCRYPT.charAt(num);
  }

  return output;
}

const CHARS_BCRYPT =
  "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CHARS_BASE64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const CHARS_BCRYPT_REVERSE: Record<string, number> = {};
const CHARS_BASE64_REVERSE: Record<string, number> = {};

for (let i = 0; i < CHARS_BCRYPT.length; i++) {
  const bcrypt = CHARS_BCRYPT.charAt(i);
  CHARS_BCRYPT_REVERSE[bcrypt] = i;
  const base64 = CHARS_BASE64.charAt(i);
  CHARS_BASE64_REVERSE[base64] = i;
}
