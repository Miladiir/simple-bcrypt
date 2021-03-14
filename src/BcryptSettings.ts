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

  public static async init(targetTime: number): Promise<void> {
    BcryptSettings.instance = new BcryptSettings(targetTime, 4);
    await new Promise((resolve: (value?: unknown) => void): void => {
      setTimeout(resolve, 1);
    });
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
