# simple-bcrypt

Hash passwords with bcrypt using secure settings. CommonJS and EcmaScript modules and syntax possible. Synchronous and asynchronous versions included.

## Installation

```
npm i -S simple-brypt
```

## Usage

### Hashing a password

Before you can hash new password the library first has to be initialized. The libray will conduct a small dance to measure hashing performance and determine an ideal setting. During this time the server should be almost idle as to not influence measurements. Somewhere in your server initialization, before any password need to be hashed, include the following snippet:

```
const {BcryptSettings} = require("simple-bcrypt");

// ...

/**
 * Your init function.
 */
async function initialize(){
  // ...
  await BcryptSettings.init(500);
  //...
}
```

This has to be done in any context where you need to calculate bcrypt hashes, e.g. in worker threads or other processes.

Then, to create a hash:

```
const {hashSync, hashAsync} = require("simple-bcrypt");

console.log(
    hashSync("test"),
    // $2b$11$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW
);
// or
hashAsync("test).then((hash) => {
    console.log(hash);
    // $2b$11$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW
});
```

In addition to the string output that you might be used to from bcrypt, there is also an additional binary output (BMCF) available. You can specify the format `string` or `binary` as a second paramenter to the hash functions.

### Comparing Hash against Password

To compare hashes, the BcryptSettings object does not need to be initialized. Simply call:

```
const {compareSync, compareAsnc} = require("simple-bcrypt");

const password = "test";
const hash = "$2b$11$OdKlPM0Km45fev22th5lhOEGT5Bj1Wip14VmZto4P18zghV25t2VW";

console.log(
    compareSync(password, hash),
    // true
    compareSync("p4ssw0rd", hash),
    // false
);
```

The async method works accordingly. Make sure to pass the two objects in the correct order. Instead of a hash in string format, you can also pass a BMCF formatted hash.

### Encode/Decode to/from BMCF

The strings that bcrypt produces are in a format called [Modular Crypt Format](https://passlib.readthedocs.io/en/stable/modular_crypt_format.html) (MCF).

The [Binary Modular Crypt Format](https://github.com/ademarre/binary-mcf) (BMCF) takes slightly less space and might therefore be useful if you need to store many passwords. The drawback is, that bcrypt does not understand BMCF natively. A conversion is required to work with the data.

This library contains two utilities to convert between the two formats for bcrypt generated hashes. As a convenience, the function `convert` simply switches between the formats.

Call `encode`, `decode`, or `convert` with a hash in the respective format and the result will be the same hash in the other format.
