

<img src="https://suign.github.io/assets/imgs/cleaker_me.png" alt="Cleaker Me" width="377" height="377">

# Cleaker
Connecting all points within a fixed distance. 

**Cleaker** is a pronoun representing a [person](https://suign.github.io/this.me/), place, or thing in space and time. 

##### What is cleaker? [click here](https://suign.github.io/pages/cleaker.html).

Its role is to function as a Digital Identifier (DID) creator; make cleaker accept an object (like a .me profile) and return a unique DID for it.

## Install with npm.
```bash
npm i cleaker
```

# Usage Example

Currently under development.

```javascript
import { generateDID } from 'cleaker';

const profile = { /* .me profile data */ };

// Generate a DID using SHA-256
const didSHA256 = generateDID(profile, 'SHA-256');
console.log('DID (SHA-256):', didSHA256);

// Generate a DID using Keccak-256
const didKeccak256 = generateDID(profile, 'Keccak-256');
console.log('DID (Keccak-256):', didKeccak256);
```



By implementing both `SHA-256` and `Keccak-256`, `cleaker` becomes a versatile tool for creating DIDs that are compatible with major blockchain networks. This approach allows for the integration of **cleaker** with a variety of blockchain technologies and potentially opens up various use cases in the **blockchain domain.**



https://www.neurons.me/

## Contributing
If you have suggestions or issues, please open an issue. We encourage contributions from the community.
## License & Policies
- **License**: MIT License (see LICENSE for details).
- **Privacy Policy**: Respects user privacy; no collection/storage of personal data.
- **Terms of Usage**: Use responsibly. No guarantees/warranties provided. [Terms](https://www.neurons.me/terms-of-use) | [Privacy](https://www.neurons.me/privacy-policy)
