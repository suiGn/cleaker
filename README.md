<img src="./_._.svg" alt="SVG Image" width="123" height="123" style="width123px; height:123px;">

## Cleaker Installation 

```bash
npm i cleaker
```

Cleaker is a comprehensive module that facilitates various functionalities like retrieving system information, authentication, signing data, and user management. Here's how you can utilize Cleaker:

```bash
node cleaked.js
```

**Console output:**

```json
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
  host_session: 'suign',
  hostHome: '/Users/suign',
  role: 'Admin',
  password: 'no_password',
  networkInterfaces: {
    lo0: { details: [Array], ip: [Array] },
    anpi1: { details: [Array], ip: [Array] },
    anpi0: { details: [Array], ip: [Array] },
    en0: { details: [Array], ip: [Array] },
    awdl0: { details: [Array], ip: [Array] },
    llw0: { details: [Array], ip: [Array] },
    utun0: { details: [Array], ip: [Array] },
    utun1: { details: [Array], ip: [Array] },
    utun2: { details: [Array], ip: [Array] },
    utun3: { details: [Array], ip: [Array] },
    utun4: { details: [Array], ip: [Array] },
    utun5: { details: [Array], ip: [Array] },
    utun6: { details: [Array], ip: [Array] },
    utun7: { details: [Array], ip: [Array] },
    utun8: { details: [Array], ip: [Array] },
    utun9: { details: [Array], ip: [Array] },
    utun10: { details: [Array], ip: [Array] },
    utun11: { details: [Array], ip: [Array] },
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

First, make sure to include the `cleaker.js` file in your project, and also have the required modules (`crypto` and `os`) available.

### Basic Usage

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

5. **Authentication**: Cleaker provides methods for authentication and user management, such as `authenticate`, `login`, and `logout`.

Authentication is the process of verifying the identity of a user, system, or application. It answers the question, "Who are you?"

Example: A user logging into a website with a username and password.
Authorization is the process of granting or denying access to specific resources based on an authenticated user's or system's permissions. It answers the question, "What are you allowed to do?"

Example: Once logged in, a user might be authorized to read content but not edit it.


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

8. **Other Features**: Cleaker also provides functionalities like recording interactions, user login/logout, verification, and more. Explore the Cleaker class to understand these features.

### Advanced Usage

The Cleaker class can be extended and customized to add additional functionalities specific to your application. Its methods can be overridden, and new properties can be added as required.

Remember to refer to the `cleaker.js` source code for precise understanding, as implementation details might vary.

By employing Cleaker, you gain access to robust features that enhance the security and functionality of your application, enabling streamlined interactions with the operating system and network, and providing essential user management capabilities.

### Conceptual Flow:

- [ ] Set up your context with [this.me.](https://www.npmjs.com/package/this.me)
- [ ] Create a neural network using [neurons.me](https://www.neurons.me).
- [ ] Define the data you'd like your neural network to recognize or process with [this.](https://www.neurons.me/this) modules.
- [ ] Use [this.be](https://www.npmjs.com/package/this.be) to maintain a state or context, - watching over  [This](https://www.neurons.me/this) and any other states you define for example.
- [ ] Define desired status and handlers, [be.this](https://www.npmjs.com/package/be.this).
- [ ] Keep [i.mlearning](https://www.npmjs.com/package/i.mlearning).

[neurons.me](https://www.neurons.me)

[neurons.me/this](https://www.neurons.me/this)

### License

This project is licensed under the **MIT License**. See the LICENSE file for details.

This **README** provides an overview of the project, instructions for installation and usage, and highlights future projections. Feel free to modify or expand it as needed. Congratulations on building this exciting tool, and good luck with its continued development!

<img src="./_._.svg" alt="SVG Image" width="69" height="69" style="width69px; height:69px;">
