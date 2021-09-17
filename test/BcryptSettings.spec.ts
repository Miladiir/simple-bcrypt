import { expect } from "chai";
import { describe } from "mocha";

import { BcryptSettings } from "../src/BcryptSettings";

describe("BcryptSettings", (): void => {
    before(async function (): Promise<void> {
        this.timeout(60000);
        await BcryptSettings.init(1000);
    });

    describe("constructor", (): void => {
        it("should not be accessible from outside (Singleton Pattern)", (): void => {
            // @ts-expect-error tslint:disable-next-line:no-unsafe-any
            const instance: BcryptSettings = new BcryptSettings();
            expect(instance).to.be.instanceOf(BcryptSettings);
        });
    });

    describe("get", (): void => {
        it("should return only one instance (Singleton Pattern)", (): void => {
            const instanceOne: BcryptSettings = BcryptSettings.get();
            const instanceTwo: BcryptSettings = BcryptSettings.get();
            expect(instanceOne).to.equal(instanceTwo);
        });
    });
});
