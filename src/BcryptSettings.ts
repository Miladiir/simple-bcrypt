import { hash } from "bcrypt";
import { performance } from "perf_hooks";
/**
 * Automatically determined save and sane default settings for bcrypt.
 */
export class BcryptSettings {
    /**
     * Get sane bcrypt settings that respect your preferences.
     */
    public static get(): BcryptSettings {
        if (BcryptSettings.instance === undefined) {
            throw new Error("Call init first");
        }

        return BcryptSettings.instance;
    }

    public static async init(targetTime: number = 500): Promise<void> {
        let rounds = 0;
        let actualTime: number = 0;
        for (let newRounds = rounds; actualTime <= targetTime; newRounds++) {
            rounds = newRounds;
            const start = performance.now();
            await hash("p4ssw0rd", rounds);
            const end = performance.now();
            actualTime = end - start;
        }
        if (targetTime * 1.5 < actualTime) {
            rounds--;
        }
        if (rounds < 10) {
            rounds = 10;
        }
        BcryptSettings.instance = new BcryptSettings(targetTime, rounds);
    }

    private static instance?: BcryptSettings;

    /**
     * @param targetTime The minimum amount of time a hashing operation should take.
     * @param saltRounds The amount of salt rounds to achieve the target time.
     */
    private constructor(targetTime: number, saltRounds: number) {
        this.targetTime = targetTime;
        this.saltRounds = saltRounds;
    }

    /**
     * The salt rounds to use for hashing.
     */
    public readonly saltRounds: number;

    /**
     * The minimum amount of time a hashing operation should take.
     */
    public readonly targetTime: number;
}
