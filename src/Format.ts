/**
 * Input and output format of hashing operations.
 */
export enum Format {
    /**
     * String format, compatible with bcrypt but slightly larger
     */
    String = "string",

    /**
     * Binary format as Buffer, incompatible with bcrypt but slightly smaller
     */
    Binary = "binary",
}
