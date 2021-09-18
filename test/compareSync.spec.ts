import { expect } from "chai";
import { compareSync, encode } from "../src";

describe("compareSync", (): void => {
    it("should return true for correct hash (string)", (): void => {
        const hash: string = "$2b$11$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW";
        const result: boolean = compareSync("test", hash);
        expect(result).to.equal(true);
    });

    it("should return false for mismatched hash (string)", (): void => {
        const hash: string = "$2b$10$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW";
        const result: boolean = compareSync("test", hash);
        expect(result).to.equal(false);
    });

    it("should return true for correct hash (Buffer)", (): void => {
        const hashString: string = "$2b$11$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW";
        const hash: Buffer = encode(hashString);
        const result: boolean = compareSync("test", hash);
        expect(result).to.equal(true);
    });

    it("should return false for mismatched hash (Buffer)", (): void => {
        const hashString: string = "$2b$10$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW";
        const hash: Buffer = encode(hashString);
        const result: boolean = compareSync("test", hash);
        expect(result).to.equal(false);
    });
});
