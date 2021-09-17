import { expect } from "chai";

import { BcryptSettings } from "../src/BcryptSettings";
import { Format } from "../src/Format";
import { hashSync } from "../src/hashSync";

describe("hashSync", (): void => {
    before(async function (): Promise<void> {
        this.timeout(60000);
        await BcryptSettings.init(1000);
    });

    it("should produce different hashes for the same secret (random salt)", (): void => {
        const input: string = "5uP3rS3cR3tP5sSW0rD";
        const secretOne: string = hashSync(input, Format.String);
        const secretTwo: string = hashSync(input, Format.String);
        expect(secretOne).to.not.equal(secretTwo);

        const bufferOne: Buffer = hashSync(input, Format.Binary);
        const bufferTwo: Buffer = hashSync(input, Format.Binary);
        expect(bufferOne.toString("base64")).to.not.equal(bufferTwo.toString("base64"));
    }).timeout(10000);
});
