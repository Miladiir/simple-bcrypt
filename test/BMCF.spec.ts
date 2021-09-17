import { expect } from "chai";
import { describe, it } from "mocha";

import { decode, encode } from "../src/BMCF";

const mcfs: string[] = [
    "$2$04$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2$04$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2$04$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2$13$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2$13$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2$13$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2$31$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2$31$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2$31$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2a$04$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2a$04$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2a$04$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2a$13$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2a$13$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2a$13$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2a$31$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2a$31$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2a$31$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2x$04$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2x$04$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2x$04$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2x$13$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2x$13$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2x$13$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2x$31$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2x$31$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2x$31$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2y$04$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2y$04$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2y$04$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2y$13$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2y$13$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2y$13$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2y$31$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2y$31$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2y$31$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2b$04$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2b$04$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2b$04$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2b$13$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2b$13$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2b$13$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
    "$2b$31$8NuaM5KWvsvi7blbdav9S.Iu.W.t8a8lCURYwo3XTCUbQSyXO0G7q",
    "$2b$31$QX2Dw29dcSBM79yVnERqceE6YhZmnzGR8N83QDMoo4QLeiITlM6xC",
    "$2b$31$pjK6TtKKAHWzG7f850HbIeeWKf73yeuaVOhZKOm.RY6z5z7/FCr0y",
];
const bmcfs: string[] = [
    "JPj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "JEmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "JK5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "Lfj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "LUmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "La5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "P/j8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "P0meBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "P65TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "RPj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "REmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "RK5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "Tfj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "TUmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "Ta5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "X/j8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "X0meBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "X65TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "ZPj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "ZEmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "ZK5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "bfj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "bUmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "ba5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "f/j8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "f0meBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "f65TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "hPj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "hEmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "hK5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "jfj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "jUmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "ja5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "n/j8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "n0meBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "n65TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "pPj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "pEmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "pK5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "rfj8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "rUmeBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "ra5TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
    "v/j8HDuzGMbsZPXZ3X3Mf1ArABgC/5z6cRZNrKrllURZ1JTRlDYj2w==",
    "v0meBcuP33lAzvf9F6Rk7HobxqNuinUhP4/7lIU6qrpI2CQpWc7zMQ==",
    "v65TPFbzDAiWNSPYfu9iXSqBgyH3nSDBxdCNsxCgBNrzXvX0EcS3bQ==",
];

describe("BMCF", (): void => {
    describe("encode", (): void => {
        it("should be able to encode bcrypt MCF to BMCF", (): void => {
            mcfs.forEach((mcf: string, index: number): void => {
                const bmcf: Buffer = encode(mcf);
                const base64Bmcf: string = bmcf.toString("base64");
                expect(base64Bmcf).to.equal(bmcfs[index], `Elements at ${index} should match.`);
            });
        });
    });

    describe("decode", (): void => {
        it("should be able to decode bcrypt BMCF to MCF", (): void => {
            bmcfs.forEach((base64Bmcf: string, index: number): void => {
                const bmcf: Buffer = Buffer.from(base64Bmcf, "base64");
                const computedMcf: string = decode(bmcf);
                expect(computedMcf).to.equal(mcfs[index], `Elements at ${index} should match.`);
            });
        });
    });
});
