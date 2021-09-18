import { expect } from "chai";
import { BcryptSettings, Format, hashSync } from "../src";

describe("hashSync", (): void => {
    before(async function (): Promise<void> {
        this.timeout(10000);
        await BcryptSettings.init(0);
    });

    it("should default to format string", (): void => {
        expect(hashSync("test")).to.be.a.string;
    });

    it("should produce different hashes for the same secret (random salt)", (): void => {
        const input: string = "5uP3rS3cR3tP5sSW0rD";
        const secretOne: string = hashSync(input, Format.String);
        const secretTwo: string = hashSync(input, Format.String);
        expect(secretOne).to.not.equal(secretTwo);

        const bufferOne: Buffer = hashSync(input, Format.Binary);
        const bufferTwo: Buffer = hashSync(input, Format.Binary);
        expect(bufferOne.toString("base64")).to.not.equal(bufferTwo.toString("base64"));
    }).timeout(20000);

    it("should throw for wrong format", (): void => {
        //@ts-expect-error
        expect(() => hashSync("123", "hujiko")).to.throw();
    });
});
