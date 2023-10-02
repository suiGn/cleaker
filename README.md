<img src="./_._.svg" alt="SVG Image" width="123" height="123" style="width123px; height:123px;">

## Cleaker Installation 

```bash
npm i cleaker
```

### Summary & Insights:

1. **Context Awareness:** Cleaker, being context-aware, is able to snapshot its state and surroundings, making it a versatile tool for different environments.
2. **Flexibility:** Cleaker being the first point of contact when moving to a new space makes it flexible and modular, allowing it to adapt to different environments and manage resources accordingly.
3. **Privacy & Security:** It’s evident that privacy and security are focal points in your design. Ensuring that sensitive information is protected while maintaining user privacy is paramount.
4. **Unified Interface:** By acting as an entry point for your application in each level directory, Cleaker can serve as a unified interface, managing interactions between different components and the user.

### Run:

```bash
node cleaked.js
```

You get a **Screenshot:**

```javascript
  	| /
  '  _  '
 -  |_|  -
  ' | | '
  _,_|___
 |   _ []|
 |  (O)  |
 |_______|it gets cleaked.
 
Cleaker {
  me: 'not me',
  onDate: 'Aug 10, 2023',
  host_session: 'sui..n',
  hostHome: '/Usr./sui..n',
  role: 'Admin',
  password: 'no_password',
  networkInterfaces: {
    lo0: { details: [Array], ip: [Array] },
    en0: { details: [Array], ip: [Array] },
    utun1: { details: [Array], ip: [Array] },
												...
    utun12: { details: [Array], ip: [Array] }
  },
  localIP: '192.168.1.92',
  cpu: { arch: 'arm64', model: 'Apple M2' },
  memory: { total: 8589934592, free: 153600000 },
  network: 'thishost',
  usrCountry: undefined,
  usrCity: undefined,
  referer: 'Unknown',
  version: { cleaker: '2.3.8' },
  deviceIdentifier: 'efa909100a5ddc6d47d340498379e99d0b45f9b23768660ffedb86198cc73407',
  authenticated: false
}
```
### Cleaker QuickStart Guide
First, make sure to include the `cleaker.js` file in your project.

# Basic Usage
1. **Importing Cleaker**: Import the Cleaker class by requiring it from where it's defined.
   ```js
   const Cleaker = require('./cleaker');
   ```

2. **Creating an Instance**: Instantiate a Cleaker object by passing required details like username, password, IP address, etc.

   ```js
   let cleaked = new Cleaker('username', 'password');
   ```

3. **Accessing Network Interfaces**: You can access details about network interfaces using `cleaked.networkInterfaces`. This object contains information about each network interface, including IP addresses.

   ```js
   console.log(cleaked.networkInterfaces['en0'].details); // Array of network interface details
   console.log(cleaked.networkInterfaces['en0'].ip); // Array of IPv4 addresses
   ```

4. **Local IP, CPU & Memory Info**: Cleaker provides local IP, CPU architecture, model, and memory details.

   ```js
   console.log("Local IP:", cleaked.localIP);
   console.log("CPU Model:", cleaked.cpu.model);
   console.log("Total Memory:", cleaked.memory.total);
   ```

---------------------------------------------------

# Authentication

The process of verifying the identity of a user, system, or application. It answers the question, **"Who are you?"**

**Cleaker** is a pronoun. A **person, place** or **thing** is **space** and **time.**

**Example:** A user logging into a website with a username and password.
Authorization is the process of granting or denying access to specific resources based on an authenticated user's or system's permissions. It answers the question, **"What are you allowed to do?"**

**Example:** Once logged in, a user might be authorized to read content but not edit it.


   ```js
   if (cleaked.authenticate('username', 'password')) {
      console.log('Authenticated successfully');
   }
   ```

6. **Data Signing**: Cleaker can also sign data using the `sign` method if the user is authenticated.

   ```js
   if (cleaked.authenticated) {
      const signature = cleaked.sign('some data');
      console.log('Signature:', signature);
   }
   ```

7. **Device Identification**: Cleaker can generate a unique device identifier.

   ```js
   console.log("Device Identifier:", cleaked.deviceIdentifier);
   ```

### Advanced Usage

The Cleaker class can be extended and customized to add additional functionalities specific to your application. Its methods can be overridden, and new properties can be added as required.

Remember to refer to the `cleaker.js` source code for precise understanding, as implementation details might vary.

By employing Cleaker, you gain access to robust features that enhance the security and functionality of your application, enabling streamlined interactions with the operating system and network, and providing essential user management capabilities.

[neurons.me](https://www.neurons.me)
[neurons.me/this](https://www.neurons.me/this)

## Contributing
If you have suggestions or issues, please open an issue. We encourage contributions from the community.
## License & Policies
- **License**: MIT License (see LICENSE for details).
- **Privacy Policy**: Respects user privacy; no collection/storage of personal data.
- **Terms of Usage**: Use responsibly. No guarantees/warranties provided. [Terms](https://www.neurons.me/terms-of-use) | [Privacy](https://www.neurons.me/privacy-policy)
