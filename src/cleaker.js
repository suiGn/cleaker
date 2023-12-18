import os from 'os';

/**
 * Class representing a Cleaker entity.
 * @class
 */
class Cleaker {
  /**
   * Create a Cleaker instance.
   * @param {string} [me="not me"] - Identifier for the Cleaker instance.
   * @param {string} [password="no_password"] - Password for the Cleaker instance.
   * @param {string} [pin="no_pin"] - PIN for the Cleaker instance.
   * @param {string} [ipAddress="no_ip"] - IP address for the Cleaker instance.
   * @param {string} [userCountry="no_country"] - Country of the Cleaker instance.
   * @param {string} [userCity="no_city"] - City of the Cleaker instance.
   * @param {string} [referer="no_referer"] - Referer of the Cleaker instance.
   */
  constructor(me = "not me", password = "no_password", pin = "no_pin", ipAddress = "no_ip", userCountry = "no_country", userCity = "no_city", referer = "no_referer") {
    this.me = me;
    this.password = password;
    this.pin = pin;
    this.ipAddress = ipAddress;
    this.userCountry = userCountry;
    this.userCity = userCity;
    this.referer = referer;
    this.username = os.userInfo().username || 'no_username';
    this.onDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    this.host_session = this.username;
    this.hostHome = os.homedir() || 'no_home';
  }
}

/**
 * Function to create and "cleak" a Cleaker instance.
 * @param {string} me - Identifier for the Cleaker instance.
 * @param {string} password - Password for the Cleaker instance.
 * @param {string} ipAddress - IP address for the Cleaker instance.
 * @param {string} userCountry - Country of the Cleaker instance.
 * @param {string} userCity - City of the Cleaker instance.
 * @param {string} referer - Referer of the Cleaker instance.
 * @returns {Cleaker} A new instance of Cleaker.
 */
function cleak(me, password, ipAddress, userCountry, userCity, referer) {
  // Create a new instance of Cleaker with the provided values
  const cleakerInstance = new Cleaker(me, password, ipAddress, userCountry, userCity, referer);
  
  // Perform additional "cleaking" operations if necessary
  // For example, logging the creation, storing in a database, etc.

  return cleakerInstance; // Return the new "cleaked" Cleaker instance
}

export { Cleaker, cleak };
