import {expect} from "chai";

import {BcryptSettings} from "../src/BcryptSettings";
import {Format} from "../src/Format";
import {hashAsync} from "../src/hashAsync";

describe("hashASync", (): void => {
  before((): void => {
    BcryptSettings.init(1000);
  });
  it("should produce different hashes for the same secret (random salt)", async (): Promise<void> => {
    const input: string = "5uP3rS3cR3tP5sSW0rD";
    const secretOne: string = await hashAsync(input, Format.String);
    const secretTwo: string = await hashAsync(input, Format.String);
    expect(secretOne).to.not.equal(secretTwo);

    const bufferOne: Buffer = await hashAsync(input, Format.Binary);
    const bufferTwo: Buffer = await hashAsync(input, Format.Binary);
    expect(bufferOne.toString("base64")).to.not.equal(
      bufferTwo.toString("base64"),
    );
  });
});
