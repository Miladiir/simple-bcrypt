import { expect } from "chai";
import { BcryptSettings, Format, hashAsync } from "../src";

describe("hashAsync", (): void => {
    before(async function (): Promise<void> {
        this.timeout(10000);
        await BcryptSettings.init(0);
    });

    it("should throw for invalid format", (): Promise<void> => {
        //@ts-expect-error
        return hashAsync("test", "hujikolp")
            .then(() => {
                throw new Error(".");
            })
            .catch((e: Error) => {
                expect(e.message).to.not.equal(".");
            });
    });

    it("should default to string output", async (): Promise<void> => {
        expect(await hashAsync("test")).to.be.a.string;
    });

    it("should produce different hashes for the same secret (random salt)", async (): Promise<void> => {
        const input: string = "5uP3rS3cR3tP5sSW0rD";
        const secretOne: string = await hashAsync(input, Format.String);
        const secretTwo: string = await hashAsync(input, Format.String);
        expect(secretOne).to.not.equal(secretTwo);

        const bufferOne: Buffer = await hashAsync(input, Format.Binary);
        const bufferTwo: Buffer = await hashAsync(input, Format.Binary);
        expect(bufferOne.toString("base64")).to.not.equal(bufferTwo.toString("base64"));
    }).timeout(20000);
});
