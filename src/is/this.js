class Person {
    constructor(id, username, userType) {
      this.id = id; // Unique ID
      this.username = username; // User's name
      this.userType = userType; // 'employee', 'customer', 'admin', etc.
    }
  
    // Method to return a unique identifier string
    getIdentifier() {
      return `${this.userType}-${this.id}`;
    }
  }

  class Place {
    constructor(id, placeType, coordinates) {
      this.id = id; // Unique ID
      this.placeType = placeType; // 'office', 'home', 'server-location', etc.
      this.coordinates = coordinates; // Could be physical or virtual
    }
  
    // Method to return a unique identifier string
    getIdentifier() {
      return `${this.placeType}-${this.id}`;
    }
  }

  class Thing {
    constructor(id, thingType, metadata) {
      this.id = id; // Unique ID
      this.thingType = thingType; // 'device', 'file', 'product', 'service', etc.
      this.metadata = metadata; // Additional information about the 'thing'
    }
  
    // Method to return a unique identifier string
    getIdentifier() {
      return `${this.thingType}-${this.id}`;
    }
  }
  