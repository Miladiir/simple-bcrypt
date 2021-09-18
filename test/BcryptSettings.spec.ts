import { expect } from "chai";
import { describe } from "mocha";

import { BcryptSettings } from "../src/BcryptSettings";

describe("BcryptSettings", (): void => {
    describe("constructor", (): void => {
        it("should not be accessible from outside (Singleton Pattern)", (): void => {
            // @ts-expect-error
            const instance: BcryptSettings = new BcryptSettings();
            expect(instance).to.be.instanceOf(BcryptSettings);
        });
    });

    describe("get", (): void => {
        it("should throw when not initialized", (): void => {
            expect(() => BcryptSettings.get()).to.throw();
        });

        it("should return only one instance (Singleton Pattern)", async (): Promise<void> => {
            await BcryptSettings.init(0);
            const instanceOne: BcryptSettings = BcryptSettings.get();
            const instanceTwo: BcryptSettings = BcryptSettings.get();
            expect(instanceOne).to.equal(instanceTwo);
        });
    });

    describe("initialize", (): void => {
        it("should never return saltRounds smaller than 10", async (): Promise<void> => {
            await BcryptSettings.init(1);
            expect(BcryptSettings.get().saltRounds).to.equal(10);
        }).timeout(60000);

        it("should work with default target time", async (): Promise<void> => {
            await BcryptSettings.init();
            expect(BcryptSettings.get().saltRounds).to.be.greaterThan(10);
        }).timeout(60000);

        it("should work with a higher than default target time", async (): Promise<void> => {
            await BcryptSettings.init(1000);
            expect(BcryptSettings.get().saltRounds).to.be.greaterThan(10);
        }).timeout(60000);
    });
});
