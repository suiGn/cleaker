//cleaker.js
const crypto = require('crypto');
const os = require('os'); 
const packageJson = require('../package.json');

class Cleaker {
  constructor(me, password, ipAddress, userCountry, userCity, referer) {
    this.me = me || "not me";
    this.username = os.userInfo().username || 'no_username'; // Added username in constructor
    this.onDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    this.host_session = os.userInfo().username ||  'no_username';
    this.hostHome = os.homedir() || 'no_home';
    this.setPassword(password);
    const ipv4Addresses = Cleaker.getIPv4();
    this.networkInterfaces = Cleaker.getNetworkInterfaces(ipv4Addresses);
    this.localIP = ipAddress || Object.values(ipv4Addresses).flat()[0] || 'no_ip';
    this.cpu = { arch: os.arch(), model: os.cpus()[0].model };
    this.memory = { total: os.totalmem(), free: os.freemem() };
    this.network = 'thishost'; // Modify this with actual host if available
    this.usrCountry = userCountry;
    this.usrCity = userCity;
    this.referer = referer || 'Unknown';
    this.version = {
      cleaker: packageJson.version
    };
    this.deviceIdentifier = this.identifyDevice();
    this.authenticated = false;
  }

  static getIPv4() {
    const networkInterfaces = os.networkInterfaces();
    const ipv4Addresses = {};
    for (const name of Object.keys(networkInterfaces)) {
      const nets = networkInterfaces[name].filter((net) => net.family === 'IPv4' && !net.internal);
      if (nets.length > 0) {
        ipv4Addresses[name] = nets.map((net) => net.address);
      }
    }
    return ipv4Addresses;
  }

  static getNetworkInterfaces(ipv4Addresses) {
    const networkInterfaces = os.networkInterfaces();
    const result = {};
    for (const [name, nets] of Object.entries(networkInterfaces)) {
      result[name] = {
        details: nets,
        ip: ipv4Addresses[name] || ['no_ip'] // Adjusted fallback to ['no_ip']
      };
    }
    return result;
  }
  // Hash and set the password
  setPassword(password) {
    this.password = password ? crypto.createHash('sha256').update(password).digest('hex') : 'no_password';
  }


  // Authentication method (replace with actual authentication logic)
  authenticate(username, password) {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (this.username === username && this.password === hashedPassword) {
      this.authenticated = true;
      // You can generate a token or session here
    } else {
      this.authenticated = false;
    }
    return this.authenticated;
  }

  // Method to generate a signature for a given data
  sign(data) {
    if (!this.authenticated) {
      throw new Error('User must be authenticated to sign data.');
    }
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    // Assume privateKey is available in this scope
    return sign.sign(privateKey, 'hex');
  }

   // Add a method to set or update the me instance later if required
   cleakMe(me) {
    this.me = me;
    // Optionally, recompute any dependent properties here.
    // this.deviceIdentifier = this.identifyDevice(); // For example
  }

  recordInteraction(interaction) {
    this.metadata.push({
      date: new Date(),
      details: interaction
      // add more fields as needed
    });
  }
  identifyDevice() {
    // Example: concatenate some system information
    const deviceId = os.hostname() + os.type() + os.release();
    // Hash the device ID
    return crypto.createHash('sha256').update(deviceId).digest('hex');
  }
  login(username, password) {
    // Logic to authenticate against a specific network and link this Cleaker instance to a user.
    // You could also include logic to work with various networks.
    this.user = { username, /* other user data */ };
  }
  logout() {
    this.user = null; // unlink from user
  }
  verify() {
    // Optionally verify this Cleaker instance against a network, based on the current user or other criteria.
  }
    // A global method to hash any input
  static hash(input) {
      return crypto.createHash('sha256').update(input).digest('hex');
  }

  static cleak(me, password, ipAddress, userCountry, userCity, referer) {
    // 1. Create the instance
    const instance = new Cleaker(me, password, ipAddress, userCountry, userCity, referer);
    // 2. Hash the instance's data
    const cleakedHash = Cleaker.hash(JSON.stringify(instance));
    // 3. Return the hash
    return cleakedHash;
  }
}

module.exports = Cleaker;
let cleaked = new Cleaker();
